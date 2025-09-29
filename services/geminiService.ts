
import { GoogleGenAI } from "@google/genai";

// Lazily initialize the GoogleGenAI client to handle potential errors gracefully.
let ai: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is not set.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function getInterviewAnswer(context: string, question: string): Promise<string> {
  if (!question.trim()) {
    return "Please provide a question.";
  }
  
  const model = "gemini-2.5-flash";

  const prompt = `
    You are an expert career coach providing real-time, on-the-fly assistance for a job interview. Your task is to generate a concise and effective answer to the interviewer's question, based on the candidate's background.

    **CRITICAL INSTRUCTIONS:**
    1.  **Directly Answer the Question:** The answer MUST directly and exclusively address the interviewer's question. Do not provide generic statements or information that is not a direct response to the specific question asked.
    2.  **Single, Concise Answer:** Provide only ONE single, cohesive answer. Do not provide multiple options or variations.
    3.  **First-Person Perspective:** The entire response MUST be in the first person (e.g., "I believe my experience...", "In my previous role, I..."). It must sound as if the candidate is speaking directly.
    4.  **No Preludes:** Do NOT start with phrases like "You could say:", "Here is a good response:", or any other meta-commentary. Just provide the raw answer.
    5.  **Context is Key:** Base your answer on the provided context, which includes the candidate's resume and details about the role.
    6.  **Be Professional & Confident:** The tone should be professional, confident, but also authentic and not overly robotic.
    7.  **Conciseness:** Keep the answer brief and to the point. Usually 2-4 sentences is ideal.
    8.  **Language:** Respond in English. Regardless of the input language, the final answer provided must be in professional English.

    ---
    **CANDIDATE & ROLE CONTEXT:**
    ${context || "No specific context provided. Provide a general, strong answer that directly answers the question."}
    ---

    **INTERVIEWER'S QUESTION:**
    ${question}
    ---

    **YOUR SUGGESTED ANSWER (as the candidate, one single paragraph):**
  `;

  try {
    const generativeAI = getAiClient();
    const response = await generativeAI.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to get an answer from the AI. Please check your API key and network connection.");
  }
}

export async function translateTextToSpanish(text: string): Promise<string> {
  if (!text.trim()) {
    return "";
  }
  const model = "gemini-2.5-flash";
  const prompt = `Translate the following English text to Spanish. Provide only the translated text, without any introductory phrases, labels, or quotation marks.\n\nTEXT: "${text}"`;
  
  try {
    const generativeAI = getAiClient();
    const response = await generativeAI.models.generateContent({
      model: model,
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error translating text with Gemini:", error);
    throw new Error("Failed to translate text. Please check your API key and network connection.");
  }
}
