
import { GoogleGenAI, Modality, Type } from "@google/genai";

const getAI = () => {
  const apiKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.VITE_API_KEY ||
    process.env.API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Set VITE_GEMINI_API_KEY.');
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeVintageItem = async (base64Image: string, mimeType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: "Analyze this vintage garment. Identify the likely era, fabric type, construction details, and historical significance. Provide styling advice for a modern context." }
      ]
    },
    config: {
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text;
};

export const generateArchiveConcept = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: `A professional studio editorial photograph of a high-end vintage fashion piece: ${prompt}. High fashion aesthetic, dramatic lighting, detailed textures, 8k resolution, cinematic composition.`,
    config: {
      numberOfImages: 1,
      aspectRatio: '3:4',
      outputMimeType: 'image/jpeg'
    }
  });
  
  const generated = response.generatedImages?.[0]?.image?.imageBytes;
  if (!generated) {
    throw new Error('Image generation returned no result.');
  }
  return `data:image/jpeg;base64,${generated}`;
};

export const startCuratorSession = (callbacks: any) => {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
      },
      systemInstruction: "You are the Lead Curator at PixelPunk, an elite vintage archive. You are sophisticated, knowledgeable about 20th-century fashion (from Victorian to Y2K), and have an eye for modern silhouettes. You help clients understand the provenance of their pieces and how to style them with contemporary techwear and minimalism. Keep your tone professional yet artistic."
    }
  });
};
