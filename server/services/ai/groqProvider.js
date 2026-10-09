import Groq from "groq-sdk";
import { buildResumePrompt } from "./resumeAISchema.js";

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

const getGroqModel = () => {
  return (
    process.env.GROQ_MODEL ||
    "openai/gpt-oss-120b"
  );
};

const parseGroqResponse = (content) => {
  if (!content) {
    throw new Error(
      "Groq returned an empty response"
    );
  }

  let cleanedText = content.trim();

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
          "Groq returned invalid JSON"
        );
      }
    }

    throw new Error(
      "Groq returned invalid JSON"
    );
  }
};

export const analyzeResumeWithGroq =
  async (resumeText) => {
    const groq = getGroqClient();
    const model = getGroqModel();

    try {
      const completion =
        await groq.chat.completions.create({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are an expert resume analyzer for NEXORA. Return only valid JSON.",
            },
            {
              role: "user",
              content:
                buildResumePrompt(resumeText),
            },
          ],
          temperature: 0.1,
          max_completion_tokens: 3000,
          reasoning_effort: "low",
          response_format: {
            type: "json_object",
          },
        });

      const content =
        completion?.choices?.[0]?.message
          ?.content;

      const analysis =
        parseGroqResponse(content);

      return {
        provider: "groq",
        model,
        analysis,
      };
    } catch (error) {
      console.error(
        "Groq provider error:",
        error.message
      );

      throw new Error(
        `Groq request failed: ${error.message}`
      );
    }
  };