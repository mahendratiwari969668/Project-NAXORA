import { GoogleGenAI } from "@google/genai";
import { buildResumePrompt } from "./resumeAISchema.js";

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not configured"
    );
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

const getGeminiModel = () => {
  return (
    process.env.GEMINI_MODEL ||
    "gemini-3.8-flash"
  );
};

const parseGeminiResponse = (text) => {
  if (!text) {
    throw new Error(
      "Gemini returned an empty response"
    );
  }

  let cleanedText = text.trim();

  if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
  }

  try {
    return JSON.parse(cleanedText);
  } catch {
    const firstBrace =
      cleanedText.indexOf("{");

    const lastBrace =
      cleanedText.lastIndexOf("}");

    if (
      firstBrace !== -1 &&
      lastBrace !== -1
    ) {
      try {
        return JSON.parse(
          cleanedText.slice(
            firstBrace,
            lastBrace + 1
          )
        );
      } catch {
        throw new Error(
          "Gemini returned invalid JSON"
        );
      }
    }

    throw new Error(
      "Gemini returned invalid JSON"
    );
  }
};

export const analyzeResumeWithGemini =
  async (resumeText) => {
    const ai = getGeminiClient();
    const model = getGeminiModel();

    try {
      const response =
        await ai.models.generateContent({
          model,
          contents:
            buildResumePrompt(resumeText),
          config: {
            responseMimeType:
              "application/json",
          },
        });

      const analysis =
        parseGeminiResponse(
          response.text
        );

      return {
        provider: "gemini",
        model,
        analysis,
      };
    } catch (error) {
      console.error(
        "Gemini provider error:",
        error.message
      );

      throw error;
    }
  };