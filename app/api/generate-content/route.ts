import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = (await request.json()) as { prompt?: string };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
    }

    const apiKey =
      process.env.GOOGLE_GEMINI_API_KEY ??
      process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "The Gemini API key is not configured." },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GOOGLE_GEMINI_MODEL ?? "gemini-3.1-flash-lite",
    });
    const result = await model.generateContent(prompt);

    return NextResponse.json({ text: result.response.text() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Gemini error";
    const isQuotaError = message.includes("429") || message.includes("quota");

    console.error("Gemini content generation failed:", message);

    return NextResponse.json(
      {
        error: isQuotaError
          ? "Gemini quota is unavailable for this API key. Check the project's API quota or billing in Google AI Studio."
          : "Gemini could not generate content. Please try again.",
      },
      { status: isQuotaError ? 429 : 500 },
    );
  }
}
