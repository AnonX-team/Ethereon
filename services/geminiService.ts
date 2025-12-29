
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Expert Cyber-Defense Analysis
 * Generates a focused risk assessment for a specific threat.
 */
export const analyzeThreat = async (threatType: string, severity: string, endpoint: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Use Pro for deep reasoning on threats
      contents: `You are ETHEREON CORE AI. Perform an emergency forensic analysis on the following security event:
      EVENT_TYPE: ${threatType}
      SEVERITY: ${severity}
      TARGET_NODE: ${endpoint}
      
      Respond with:
      1. RISK_LEVEL (0-100)
      2. 3-sentence technical summary.
      3. IMMEDIATE_ACTION command.`,
      config: {
        temperature: 0.4, // Lower temperature for more analytical/precise output
        topP: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("ETHEREON AI ERROR:", error);
    return "ANALYSIS_FAILURE: Neural links compromised. Proceed with manual mitigation protocol.";
  }
};

/**
 * System Health Executive Summary
 * Synthesizes logs and active threats into a concise status report.
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
