import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

// @see: https://openrouter.ai/docs/community/frameworks#vercel-ai-sdk
const openrouter = createOpenRouter({
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
});

// Scan data folder for files of the form "\d-\w+\.md", concatenate all its contents using "\n" as separator into the systemPrompt variable.
const dataFolderPath = path.join(process.cwd(), 'data');
const filePattern = /^\d-\w+\.md$/;
const files = fs.readdirSync(dataFolderPath).filter(file => filePattern.test(file));
const fileContents = files.map(file => fs.readFileSync(path.join(dataFolderPath, file), 'utf-8'));
const systemPrompt = fileContents.join('\n');

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// @see https://sdk.vercel.ai/docs/guides/rag-chatbot#create-api-route
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    let model = "";
    // TODO: choose model or create fallback logic
    model = "google/gemini-2.0-flash-001"; // Pay 0.1 -> 0.4
    model = 'sophosympatheia/rogue-rose-103b-v0.2:free';
    model = "deepseek/deepseek-r1-distill-llama-8b"; // Pay 0.04 -> 0.04
    model = "deepseek/deepseek-r1-distill-llama-70b:free"
    model = "mistralai/mistral-nemo"
    model = "mistralai/ministral-8b"
    model = "google/gemini-2.0-flash-lite-preview-02-05:free";

    // @see: https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text
    const result = streamText({
      model: openrouter(model),
      system: systemPrompt,
      temperature: 0.5,
      messages: messages,
    });
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
