import { GoogleGenAI } from "@google/genai";
import { SupportedLanguage } from "../types";

// Maximum file size for inline Data URL (approx 20MB safety limit for browser stability)
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

export const transcribeMedia = async (file: File, language: SupportedLanguage): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Please upload files smaller than 20MB for this web demo.`);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Convert File to Base64
  const base64Data = await fileToGenerativePart(file);

  try {
    const modelId = 'gemini-2.5-flash';
    
    const prompt = `
      Please transcribe the attached audio or video file into ${language}.
      
      Requirements:
      1. Provide a highly accurate, word-for-word transcript.
      2. Do not include timestamp codes (like [00:12]).
      3. Do not describe background noises (like [music], [applause]) unless relevant to the context.
      4. If there are multiple speakers, label them as Speaker 1, Speaker 2, etc., only if they are clearly distinguishable.
      5. Output ONLY the raw transcript text. Do not add any introductory or concluding remarks (e.g., "Here is the transcript").
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          },
          { text: prompt }
        ]
      }
    });

    if (response.text) {
        return response.text;
    }
    
    throw new Error("No transcript generated.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to transcribe media.");
  }
};

const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:audio/mp3;base64,")
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
