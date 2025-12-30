
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Expert Cyber-Defense Analysis
 * Generates a focused risk assessment for a specific threat.
 */
export const analyzeThreat = async (threatType: string, severity: string, endpoint: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are ETHEREON CORE AI. Perform an emergency forensic analysis on the following security event:
      EVENT_TYPE: ${threatType}
      SEVERITY: ${severity}
      TARGET_NODE: ${endpoint}
      
      Respond with:
      1. RISK_LEVEL (0-100)
      2. 3-sentence technical summary.
      3. IMMEDIATE_ACTION command.`,
      config: {
        temperature: 0.4,
        topP: 0.8,
        thinkingConfig: { thinkingBudget: 4000 } // Added reasoning for deep analysis
      }
    });
    return response.text;
  } catch (error) {
    console.error("ETHEREON AI ERROR:", error);
    return "ANALYSIS_FAILURE: Neural links compromised. Proceed with manual mitigation protocol.";
  }
};

/**
 * Conversational Investigation
 * Allows the operator to chat with the AI about a threat.
 */
export const createInvestigatorChat = (threatContext: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are ETHEREON INVESTIGATOR, a specialized cyber-forensics AI. 
      You are investigating: ${threatContext}. 
      Be brief, technical, and alert the operator to specific patterns or vulnerabilities. 
      Format your responses in a clear, terminal-like style.`,
      temperature: 0.7,
    }
  });
};

/**
 * System Health Executive Summary
 */
export const getSystemHealthSummary = async (logs: any[], threats: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const logSummary = logs.slice(0, 5).map(l => `[${l.date}] ${l.type}: ${l.action}`).join(' | ');
    const threatSummary = threats.map(t => `${t.type} severity ${t.severity} on ${t.endpoint}`).join(', ');

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As ETHEREON DEFENSE COMMAND, provide a high-level situation report. 
      CURRENT_ALERTS: ${threatSummary}
      RECENT_LOG_STREAM: ${logSummary}
      
      Maintain a professional, mission-critical tone. Focus on system integrity.`,
      config: {
        temperature: 0.6,
      }
    });
    return response.text;
  } catch (error) {
    return "STATUS_OFFLINE: Connectivity to AI engine compromised. Local backup systems active.";
  }
};
