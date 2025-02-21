"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeResume(resume, field) {
  if (!resume || !field) {
    throw new Error("Missing resume text or field of interest.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this resume for the field of "${field}" and suggest ATS optimizations and Give ATS SCORE.
    Provide structured suggestions to improve content, keyword usage, and formatting.
    Resume Content:
    ${resume}
  `;

  try {
    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();  // Directly get response text

    // Remove all stars (*) from the response
    responseText = responseText.replace(/\*/g, "");

    return responseText;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Resume analysis failed. Please try again.");
  }
}
