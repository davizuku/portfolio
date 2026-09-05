import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ModelMessage, streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";
import { getPrompts } from "@/app/lib/modules/prompts/storage";
import { Prompt } from "@/app/lib/modules/prompts/definitions";
import { normalizeMessage } from "@/app/lib/message-utils";

// @see: https://openrouter.ai/docs/community/frameworks#vercel-ai-sdk
const openrouter = createOpenRouter({
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
});

function getModelName() {
  let model = "";
  // TODO: add fallback to paid model when rate limit reached
  model = "qwen/qwen3.7-flash" // Pay 0.03 -> 0.13 (ctxt: 1M)
  return model;
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const normalizedMessages: ModelMessage[] = Array.isArray(messages)
      ? messages.map(normalizeMessage)
      : [];

    const prompts = await getPrompts();
    const systemPrompt = prompts.map((p: Prompt) => p.content).join('\n\n') || 'You are a helpful portfolio assistant.';

    const result = streamText({
      model: openrouter(getModelName()),
      system: systemPrompt,
      temperature: 0.5,
      maxOutputTokens: 1000,
      messages: normalizedMessages,
      onError: ({ error }) => {
        console.error(`An error occurred while generating text in api/agent: ${error}`);
      }
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
