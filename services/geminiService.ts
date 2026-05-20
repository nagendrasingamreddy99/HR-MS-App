import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateHRContent = async (prompt: string, type: 'SOP' | 'JD' | 'POLICY'): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  const systemInstruction = `You are an expert HR Manager for the Hospitality industry (TalentPlate). 
  If type is 'SOP', structure it with steps and safety warnings.
  If type is 'JD', include Role, Responsibilities, and Requirements.
  If type is 'POLICY', keep it legal-compliant yet friendly.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction, temperature: 0.7 }
    });
    return response.text || "Could not generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content.";
  }
};

export const generateSmartRoster = async (date: string, salesForecast: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";
  
  const prompt = `Create a staffing roster for a busy restaurant for ${date}. 
  Forecast: ${salesForecast}. 
  Roles needed: Chef, Sous Chef, Waiters, Bartender.
  Optimize for peak hours (7PM - 10PM). 
  Format as a simple list of shifts.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not generate roster.";
  } catch (error) {
    return "Error generating roster.";
  }
};

export const analyzeSentiment = async (feedback: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  const prompt = `Analyze the sentiment of this employee feedback: "${feedback}". 
  Is it Positive, Neutral, or Negative? 
  If Negative, suggest a quick HR intervention step.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not analyze sentiment.";
  } catch (error) {
    return "Error analyzing sentiment.";
  }
};
