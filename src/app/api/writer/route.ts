import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";

// @see: https://openrouter.ai/docs/community/frameworks#vercel-ai-sdk
const openrouter = createOpenRouter({
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// @see https://sdk.vercel.ai/docs/guides/rag-chatbot#create-api-route
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    let model = "";
    // TODO: add fallback to paid model when rate limit reached
    // model = "mistralai/mistral-small-24b-instruct-2501:free";
    model = "liquid/lfm-7b"; // Pay 0.01 -> 0.01
    // @see: https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text
    const result = streamText({
      model: openrouter(model),
      system: [
        "You are an expert hiring manager. ",
        "You write simple, clear, and concise content. ",
        "Your tone is warm and professional. ",
        "When asked for rephrasing a sentence, do not show alternatives, i.e. directly write one of the alternatives.",
      ].join(' '),
      temperature: 0.5,
      prompt: "Rephrase into a new sentence the following one: '" + prompt + "'",
      onError: ({ error }) => {
        console.error(`An error occurred while generating text in api/writer for prompt: '${prompt}': ${error}`);
      }
    });
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
