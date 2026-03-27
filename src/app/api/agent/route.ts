import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";
import { getPrompts } from "@/app/lib/modules/prompts/storage";
import { Prompt } from "@/app/lib/modules/prompts/definitions";
import { ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda } from "@langchain/core/runnables";

// @see: https://openrouter.ai/docs/community/frameworks#vercel-ai-sdk
const openrouter = createOpenRouter({
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
});

const chatChain = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate("{system_prompt}"),
  new MessagesPlaceholder("messages"),
]);

function normalizeMessage(message: any) {
  if (message == null || typeof message !== 'object') {
    return { role: 'user', content: String(message ?? '') };
  }
  if (typeof message.content === 'string') {
    return { role: message.role ?? message.type ?? 'user', content: message.content };
  }
  if (Array.isArray(message.content)) {
    return {
      role: message.role ?? message.type ?? 'user',
      content: message.content.map((block: any) => typeof block === 'string' ? block : block?.text ?? '').join(''),
    };
  }
  return {
    role: message.role ?? message.type ?? 'user',
    content: String(message.content ?? ''),
  };
}

const openRouterRunnable = RunnableLambda.from(async (promptMessages: any) => {
  const messagesArray = Array.isArray(promptMessages) ? promptMessages : [promptMessages];
  const normalized = messagesArray.map(normalizeMessage);
  const systemMessage = normalized.find((msg) => msg.role === 'system');
  const userMessages = normalized.filter((msg) => msg.role !== 'system');

  const model = getModelName();

  const result = streamText({
    model: openrouter(model),
    system: systemMessage?.content ?? '',
    temperature: 0.5,
    maxTokens: 1000,
    messages: userMessages,
    onError: ({ error }) => {
      console.error(`An error occurred while generating text in api/agent for prompt: '${JSON.stringify(userMessages)}': ${error}`);
    }
  });

  return result;
});

function getModelName() {
  let model = "";
  // TODO: add fallback to paid model when rate limit reached
  model = "google/gemini-2.0-flash-001"; // Pay 0.1 -> 0.4
  model = 'sophosympatheia/rogue-rose-103b-v0.2:free';
  model = "deepseek/deepseek-r1-distill-llama-70b:free";
  model = "deepseek/deepseek-r1-distill-llama-8b"; // Pay 0.04 -> 0.04
  model = "mistralai/mistral-nemo"  // Pay 0.035 -> 0.08
  model = "google/gemini-2.0-flash-lite-preview-02-05:free";
  model = "mistralai/ministral-8b" // Pay 0.1 -> 0.1
  model = "meta-llama/llama-3.2-1b-instruct" // Pay 0.01 -> 0.01
  model = "google/gemini-flash-1.5-8b" // Pay 0.075 -> 0.3
  return model;
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const prompts = await getPrompts();
    const systemPrompt = prompts.map((p: Prompt) => p.content).join('\n');

    const chain = chatChain.pipe(openRouterRunnable);
    const result = await chain.invoke({ system_prompt: systemPrompt, messages });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
