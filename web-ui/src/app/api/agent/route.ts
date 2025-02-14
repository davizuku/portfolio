import { Message } from "@/app/types";
import { appendFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
  defaultHeaders: {}
});

async function getChatCompletion(messages: Message[]): Promise<ReadableStream> {
  let model = "";
  model = "google/gemini-2.0-flash-001"; // Pay 0.1 -> 0.4
  model = "google/gemini-2.0-flash-lite-preview-02-05:free";
  model = "deepseek/deepseek-r1-distill-llama-8b"; // Pay 0.04 -> 0.04
  model = 'sophosympatheia/rogue-rose-103b-v0.2:free';

  const completion = await openai.chat.completions.create({
    model: model,
    messages: messages.map((m: Message) => ({ role: m.role, content: m.content } ) ),
    temperature: 0.5,
    max_completion_tokens: 300,
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      let startedThinking = false;
      let finishedThinking = false;
      for await (const chunk of completion) {
        const text = chunk.choices[0]?.delta?.content || '';
        const thinking = false; // TODO: discover how to obtain this value
        let content: string = '';
        if (!startedThinking && thinking) {
          startedThinking = true;
          content += "<think>";
        }
        content += text;
        if (startedThinking && !finishedThinking && !thinking) {
          finishedThinking = true;
          content += "</think>";
        }
        controller.enqueue(content);
      }
      controller.close();
    }
  });
  return stream;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const stream = await getChatCompletion(messages);
    return new NextResponse(stream);
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
