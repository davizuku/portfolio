import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";
import { getPrompts } from "@/app/lib/modules/prompts/storage";
import { Prompt } from "@/app/lib/modules/prompts/definitions"

// @see: https://openrouter.ai/docs/community/frameworks#vercel-ai-sdk
const openrouter = createOpenRouter({
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
});

const prompts = await getPrompts();
const systemPrompt = prompts.map((p: Prompt) => p.content).join('\n');

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// @see https://sdk.vercel.ai/docs/guides/rag-chatbot#create-api-route
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    let model = "";
    // TODO: add fallback to paid model when rate limit reached
    model = "google/gemini-2.0-flash-001"; // Pay 0.1 -> 0.4
    model = 'sophosympatheia/rogue-rose-103b-v0.2:free';
    model = "deepseek/deepseek-r1-distill-llama-70b:free"
    model = "deepseek/deepseek-r1-distill-llama-8b"; // Pay 0.04 -> 0.04
    model = "mistralai/mistral-nemo"  // Pay 0.035 -> 0.08
    model = "google/gemini-2.0-flash-lite-preview-02-05:free";
    model = "mistralai/ministral-8b" // Pay 0.1 -> 0.1
    model = "meta-llama/llama-3.2-1b-instruct" // Pay 0.01 -> 0.01
    model = "google/gemini-flash-1.5-8b" // Pay 0.075 -> 0.3

    // @see: https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text
    const result = streamText({
      model: openrouter(model),
      system: systemPrompt,
      temperature: 0.5,
      maxTokens: 1000,
      messages: messages,
      onError: ({ error }) => {
        console.error(`An error occurred while generating text in api/agent for prompt: '${JSON.stringify(messages)}': ${error}`);
      }
    });
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
