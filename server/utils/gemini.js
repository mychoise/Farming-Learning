import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { db } from "../db.config.js";
import { eq } from "drizzle-orm";
import { cropTable } from "../db/schema/crop.js";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAIResponse = async (question) => {
  const location = "Nepal";

  const prompt = `
You are an expert agricultural consultant in ${location}.

Provide practical and structured farming advice for the following question:

${question}

Make the answer:
- Clear
- Step-by-step (if needed)
- Suitable for local climate
- Farmer-friendly
`;

  console.log("Prompt:", prompt);
  console.log("Model:", "gemini-flash-latest");

  const result = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
    config: {
      temperature: 0.7,
      maxOutputTokens: 2000,
    },
  });

  return result.text;
};

export const diseaseDetectionAI = async (
  descriptionOfDisease,
  imageUrl,
  plantName,
) => {
  const crop = await db
    .select()
    .from(cropTable)
    .where(eq(cropTable.name, plantName));

  if (!crop.length) throw new Error(`Crop not found: ${plantName}`);

  const c = crop[0];

  const cropContext = `
Crop Information:
Name: ${c.name}
Nepali Name: ${c.nepaliName ?? "Not specified"}
Description: ${c.description}

Soil & Climate:
Climate: ${c.climate ?? "Not specified"}
Soil Type: ${c.soilType ?? "Not specified"}
Season: ${c.season ?? "Not specified"}

Nutrient Requirements (kg/ha):
Nitrogen: ${c.nitrogen}
Phosphorus: ${c.phosphorus}
Potassium: ${c.potassium}

Difficulty: ${c.difficulty ?? "Not specified"}
`;

  // Fetch image from Cloudinary and convert to base64
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok)
    throw new Error(`Failed to fetch image: ${imageResponse.status}`);
  const imageBuffer = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  const promptForOllama = `
You are an expert agricultural plant pathologist specializing in Nepali crops and diseases.

Crop context: ${cropContext}

Analyze the image and farmer description. Identify:
1. The crop species
2. Visible symptoms (yellowing, spots, wilting, mold, holes, curling, rot)
3. Most likely disease

Common Nepal crops: Tomato, Potato, Rice, Maize, Wheat, Cabbage, Cauliflower, Chili, Onion, Garlic, Banana, Mango, Mustard.

Return ONLY valid JSON:
{
  "plant": "Detected crop name",
  "predictedDisease": "Most likely disease (one only)",
  "visibleSymptoms": "List of observed symptoms from image",
  "descriptionByAi": "Why symptoms match the disease",
  "confirmatoryScore": 0.00
}

Rules:
1. Output ONLY valid JSON, no markdown.
2. confirmatoryScore between 0.00 and 1.00.
3. Never invent diseases.

Farmer description: ${descriptionOfDisease}
`;

  // STEP 1: Ollama handles vision/image analysis
  const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llava:7b",
      prompt: promptForOllama,
      images: [base64Image],
      format: "json",
      stream: false,
      options: {
        temperature: 0.1,
        num_predict: 500,
      },
    }),
  });

  if (!ollamaResponse.ok) {
    throw new Error(
      `Ollama error: ${ollamaResponse.status}. Make sure 'ollama serve' is running`,
    );
  }

  const ollamaResult = await ollamaResponse.json();
  let ollamaData;
  try {
    ollamaData = JSON.parse(ollamaResult.response);
  } catch {
    throw new Error(`Ollama returned invalid JSON: ${ollamaResult.response}`);
  }

  // STEP 2: Gemini refines and enriches Ollama's analysis
  const promptForGemini = `
You are an expert agricultural plant pathologist specializing in Nepali crops and farming practices.

A vision AI has analyzed a crop image and produced this initial diagnosis:
${JSON.stringify(ollamaData, null, 2)}

Crop database context:
${cropContext}

Farmer's original description: "${descriptionOfDisease}"

Your task:
1. Validate or correct the disease identification based on all available information.
2. Provide a detailed, practical treatment plan suitable for Nepali farmers using locally available resources.
3. Mention any preventive measures for the future.

Return EXACTLY this JSON format and nothing else:
{
  "plant": "Confirmed crop name",
  "predictedDisease": "Confirmed or corrected disease name (one only)",
  "descriptionByAi": "Detailed explanation of why the symptoms match this disease",
  "treatment": "Step-by-step practical treatment for Nepali farmers using local/organic options",
  "confirmatoryScore": 0.00
}

Rules:
1. Output ONLY valid JSON, no markdown, no backticks.
2. confirmatoryScore between 0.00 and 1.00.
3. Use simple language farmers can understand.
4. Never invent diseases.
5. treatment must be actionable and specific to Nepal.
`;

  const geminiResponse = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: promptForGemini,
    config: {
      temperature: 0.1,
      responseMimeType: "application/json",
      maxOutputTokens: 2000,
    },
  });

  // ai.models.generateContent() returns the result directly, no .json() needed
  const geminiText = geminiResponse.text;

  // Strip markdown backticks if Gemini wraps JSON in them
  const cleanedText = geminiText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleanedText);
  } catch {
    throw new Error(`Gemini returned invalid JSON: ${geminiText}`);
  }
};
