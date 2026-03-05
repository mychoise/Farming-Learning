import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
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
