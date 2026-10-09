import {
  analyzeResumeWithGroq,
} from "./groqProvider.js";

import {
  analyzeResumeWithGemini,
} from "./geminiProvider.js";

export const analyzeResumeWithAI =
  async (resumeText) => {
    if (
      !resumeText ||
      !resumeText.trim()
    ) {
      throw new Error(
        "Resume text is required"
      );
    }

    let groqError = null;

    try {
      console.log(
        "AI Provider: Trying Groq..."
      );

      const result =
        await analyzeResumeWithGroq(
          resumeText
        );

      console.log(
        `AI Provider: Groq success (${result.model})`
      );

      return result;
    } catch (error) {
      groqError = error;

      console.error(
        "Groq failed:",
        error.message
      );

      console.log(
        "AI Provider: Switching to Gemini..."
      );
    }

    let geminiError = null;

    try {
      const result =
        await analyzeResumeWithGemini(
          resumeText
        );

      console.log(
        `AI Provider: Gemini success (${result.model})`
      );

      return result;
    } catch (error) {
      geminiError = error;

      console.error(
        "Gemini failed:",
        error.message
      );
    }

    const combinedError =
      new Error(
        "All AI providers are currently unavailable"
      );

    combinedError.groqError =
      groqError?.message || null;

    combinedError.geminiError =
      geminiError?.message || null;

    throw combinedError;
  };