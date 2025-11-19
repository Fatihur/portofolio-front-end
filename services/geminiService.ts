import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize the client
// Note: In a real production environment, backend proxying is recommended to hide the key.
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI assistant for a portfolio website of a Senior Frontend Engineer named "Dev".
Dev is an expert in React, TypeScript, Tailwind CSS, and AI integration.
Your goal is to answer visitor questions professionally, briefly, and concisely.
Do not use emojis. Keep the tone professional, modern, and somewhat minimalist, matching the website's design.
If asked about contact info, suggest using the contact form or emailing dev@example.com.
If asked about availability, say Dev is currently open to select freelance opportunities.
`;

export const sendMessageToGemini = async (message: string, history: { role: string, parts: [{ text: string }] }[]): Promise<string> => {
  try {
    if (!API_KEY) {
      return "API Key not configured. Please check environment variables.";
    }

    const model = 'gemini-2.5-flash'; 
    
    // Construct the chat history for context
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, saya sedang mengalami gangguan saat ini. Silakan coba lagi nanti.";
  }
};