
import { GoogleGenAI } from "@google/genai";

// FIX: Replace the mocked service with a real Gemini API call for threat analysis.
// Initialize the Gemini client. The API key is expected to be in process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeThreat = async (target: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro", // Using a powerful model for complex code analysis.
            contents: `Analyze the following code snippet or application description for potential security vulnerabilities. Provide a report in Markdown format. Target: "${target}"`,
            config: {
                systemInstruction: "You are a cybersecurity expert AI. Your task is to analyze code snippets or application descriptions for security vulnerabilities. Provide a concise, professional report in Markdown format, identifying potential threats, their severity (Critical, High, Medium, Low, Info), and clear recommendations for mitigation. Do not include any conversational filler.",
            }
        });
        
        // The component expects a markdown string. We add a header to the AI response.
        return `### AI-Generated Threat Analysis Report\n\n**Target:** User-provided snippet\n**Analysis Engine:** Gemini\n---\n${response.text}`;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Propagate a user-friendly error to be displayed in the terminal component.
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred during threat analysis.");
    }
};
