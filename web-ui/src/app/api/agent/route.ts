import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { CoreMessage, streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";

// @see: https://openrouter.ai/docs/community/frameworks#vercel-ai-sdk
const openrouter = createOpenRouter({
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
});

// TODO: fill systemPrompt with proper instructions
const systemPrompt = '';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// @see https://sdk.vercel.ai/docs/guides/rag-chatbot#create-api-route
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    let model = "";
    // TODO: choose model or create fallback logic
    model = "google/gemini-2.0-flash-001"; // Pay 0.1 -> 0.4
    model = "google/gemini-2.0-flash-lite-preview-02-05:free";
    model = 'sophosympatheia/rogue-rose-103b-v0.2:free';
    model = "deepseek/deepseek-r1-distill-llama-8b"; // Pay 0.04 -> 0.04
    model = "deepseek/deepseek-r1-distill-llama-70b:free"

    const result = streamText({
      model: openrouter(model),
      system: systemPrompt,
      temperature: 0.5,
      maxTokens: 300,
      messages: messages,
    });
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
