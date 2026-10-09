import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (buffer) => {
  if (!buffer || !buffer.length) {
    throw new Error("PDF file is empty");
  }

  const parser = new PDFParse({
    data: buffer,
  });

  try {
    const result = await parser.getText();
    const text = result?.text?.trim();

    if (!text) {
      throw new Error("No readable text found in the PDF");
    }

    return text;
  } finally {
    try {
      await parser.destroy();
    } catch {
      // Ignore cleanup errors so original error is not masked
    }
  }
};