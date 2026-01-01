
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Enhanced Cyber-Defense Analysis with Custom Knowledge
 * Injects user-provided "training data" into the prompt.
 */
export const analyzeThreat = async (
  threatType: string, 
  severity: string, 
  endpoint: string, 
  knowledgeBase: string[] = []
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const trainingData = knowledgeBase.length > 0 
      ? `\nCUSTOM_TRAINING_CONTEXT:\n${knowledgeBase.join('\n')}` 
      : "";

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are ETHEREON CORE AI. Perform emergency analysis.${trainingData}
      
      EVENT_TYPE: ${threatType}
      SEVERITY: ${severity}
      TARGET_NODE: ${endpoint}
      
      Respond in JSON format:
      {
        "risk_score": 0-100,
        "summary": "technical brief",
        "action": "immediate command",
        "confidence": "low|med|high"
      }`,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("ETHEREON AI ERROR:", error);
    return null;
  }
};

/**
 * Tactical Map Grounding
 */
export const getTacticalMapContext = async (location: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Identify the security infrastructure and potential network hops near ${location}.`,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    return {
      text: response.text,
      links: chunks?.map((c: any) => c.maps?.uri).filter(Boolean) || []
    };
  } catch (error) {
    return { text: "Tactical uplink failed.", links: [] };
  }
};

/**
 * Investigator Chat with Persistence
 */
export const createInvestigatorChat = (threatContext: string, trainingData: string[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const customContext = trainingData.length > 0 
    ? `\nUse this specialized knowledge for your investigation:\n${trainingData.join('\n')}` 
    : "";

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are ETHEREON INVESTIGATOR.${customContext}
      You are investigating: ${threatContext}. 
      Provide deep technical forensics.`,
      temperature: 0.7,
    }
  });
};

/**
 * General AI Command Chat
 */
export const createGeneralChat = (knowledgeBase: string[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const customContext = knowledgeBase.length > 0 
    ? `\nORGANIZATIONAL_CONTEXT:\n${knowledgeBase.join('\n')}` 
    : "";

  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are ETHEREON COMMAND AI, the primary interface for the Cyber-Defense Control Center.${customContext}
      Assist the operator with system queries, security best practices, and tactical advice. 
      Maintain a professional, high-tech, and efficient persona.`,
      temperature: 0.8,
    }
  });
};

/**
 * Generates a concise situation report for the command dashboard.
 */
export const getSystemHealthSummary = async (logs: any[], threats: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following system logs and active threats to provide a high-level security status report.
      
      LOGS: ${JSON.stringify(logs)}
      THREATS: ${JSON.stringify(threats)}
      
      Summarize the current situation in 2-3 sentences for a technical lead.`,
    });
    return response.text;
  } catch (error) {
    console.error("Health Summary Error:", error);
    return "Audit system currently unavailable.";
  }
};
