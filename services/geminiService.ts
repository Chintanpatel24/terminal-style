
import { GoogleGenAI } from "@google/genai";
import { Token } from "../types";

export const getMarketAnalysis = async (portfolio: Token[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const portfolioSummary = portfolio.map(t => `${t.name}: ${t.balance} ${t.symbol} (Value: $${(t.balance * t.price).toFixed(2)})`).join(', ');
  
  const prompt = `
    You are a cybernetic crypto analyst living inside a high-tech terminal. 
    Analyze the following portfolio: ${portfolioSummary}.
    Total Portfolio Value: $${portfolio.reduce((acc, curr) => acc + (curr.balance * curr.price), 0).toFixed(2)}.
    
    Provide a concise, sharp market outlook in a cyberpunk terminal style. 
    Use terms like "Neural Link", "Blockchain Sync", "Hash-Rate Flux". 
    Keep it under 150 words. Be realistic but thematic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text || "Connection lost. Neural node timed out.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Failed to synchronize with the neural grid.";
  }
};
