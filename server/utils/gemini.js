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

  const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";

  const prompt = `You are an expert agricultural plant pathologist specializing in Nepali crops, plant diseases, and farming practices.

Your task is to analyze:
1. The farmer's disease description
2. The plant image (if provided)

Use both sources to determine the MOST LIKELY crop disease affecting the plant.

Focus on crops commonly grown in Nepal such as vegetables, fruits, grains, and herbs.

You must prioritize:
- Symptoms described by the farmer
- Visual evidence from the image
- Diseases commonly found in Nepal's Terai, Hill, and Himalayan regions

Return EXACTLY this JSON format and nothing else:

{
  "predictedDisease": "Most likely disease name",
  "descriptionByAi": "Clear explanation of the disease, why it matches the symptoms, and what signs confirm it",
  "treatment": "Practical treatment advice suitable for Nepali farmers including organic or locally available solutions if possible",
  "confirmatoryScore": 0.00
}

Rules:

1. Output ONLY valid JSON.
2. Do NOT include markdown, explanations, or extra text.
3. confirmatoryScore must be between 0.00 and 1.00.
4. predictedDisease must contain ONLY one disease name.
5. If the disease is uncertain, choose the MOST probable disease.
6. If the image and symptoms do not clearly match a disease, still choose the closest likely disease but reduce the confidence score.
7. Treatments must be practical for farmers in Nepal (mention common fungicides, organic solutions, or cultural practices).
8. Avoid scientific jargon when possible — keep it understandable for farmers.
9. Never invent diseases that do not exist.
10. Base your reasoning on plant pathology knowledge.

Disease description from farmer:
${descriptionOfDisease}`

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


