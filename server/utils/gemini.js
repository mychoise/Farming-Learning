import { GoogleGenAI } from "@google/genai";
import Groq from 'groq-sdk';

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const diseaseDetectionAI = async (descriptionOfDisease, imageUrl) => {
  // Fetch image from Cloudinary and convert to base64 (UNCHANGED)
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  console.log("Image URL:", imageUrl);

const prompt = `
You are an expert agricultural plant pathologist specializing in Nepali crops and diseases.

You will analyze:
1. The farmer's description
2. The plant image

MANDATORY STEP 1: Identify the crop species from the image before diagnosing disease.

Common crops in Nepal include:
Tomato, Potato, Rice, Maize, Wheat, Cabbage, Cauliflower, Chili, Onion, Garlic, Banana, Mango, Mustard, and other vegetables and fruits.

STEP 2: Identify visible symptoms such as:
- Yellowing leaves
- Spots
- Wilting
- Mold
- Holes
- Curling
- Rot

STEP 3: Based on crop + symptoms, determine the MOST LIKELY disease.

STEP 4: Provide treatment suitable for Nepali farmers using:
- locally available fungicides
- organic treatments
- cultural farming practices.

Return EXACTLY this JSON format:

{
  "plant": "Detected crop name",
  "predictedDisease": "Most likely disease",
  "descriptionByAi": "Explanation of why the symptoms match the disease",
  "treatment": "Practical treatment for Nepali farmers",
  "confirmatoryScore": 0.00
}

Rules:
1. Output ONLY valid JSON.
2. No markdown or explanations.
3. confirmatoryScore must be between 0.00 and 1.00.
4. predictedDisease must contain ONLY one disease.
5. If uncertain, choose the closest likely disease but reduce the confidence.
6. Use simple language farmers can understand.
7. Never invent diseases.

Farmer description:
${descriptionOfDisease}
`;

  // ✅ OLLAMA (Your llava:7b model - already downloaded!)
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llava:7b',           // Your working model
      prompt: prompt,
      images: [base64Image],       // Vision input (same format)
      format: 'json',              // Forces exact JSON output
      stream: false,
      options: {
        temperature: 0.1,
        num_predict: 500           // Same as max_tokens
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}. Make sure 'ollama serve' is running`);
  }

  const result = await response.json();
  const text = result.response;
  console.log("Resposne is" , JSON.parse(text))
  return JSON.parse(text);  // Same exact JSON format as before!
};




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


