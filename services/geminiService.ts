
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeThreat = async (threatType: string, severity: string, endpoint: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert cybersecurity analyst at Ethereon. Analyze the following threat:
      Type: ${threatType}
      Severity: ${severity}
      Affected Endpoint: ${endpoint}
      
      Provide a concise 3-sentence risk summary and a recommended next step.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI analysis. Please manually investigate the logs.";
  }
};

export const getSystemHealthSummary = async (logs: any[], threats: any[]) => {
  try {
    const logSummary = logs.map(l => `${l.date}: ${l.type} - ${l.action}`).join('\n');
    const threatSummary = threats.map(t => `${t.type} (${t.severity}) on ${t.endpoint}`).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As the Ethereon AI Assistant, summarize the current system health based on these logs and active threats. Keep it brief and professional.
      
      LOGS:
      ${logSummary}
      
      THREATS:
      ${threatSummary}`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    return "System status report unavailable. Connectivity to AI engine compromised.";
  }
};
