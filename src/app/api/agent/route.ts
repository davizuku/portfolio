import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ModelMessage, streamText } from 'ai';
import { toBaseMessages } from '@ai-sdk/langchain';
import { NextRequest, NextResponse } from "next/server";
import { getPrompts } from "@/app/lib/modules/prompts/storage";
import { Prompt } from "@/app/lib/modules/prompts/definitions";
import { ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda } from "@langchain/core/runnables";
import { ChatPromptValue } from "@langchain/core/prompt_values";
import { BaseMessage } from "@langchain/core/messages";

// @see: https://openrouter.ai/docs/community/frameworks#vercel-ai-sdk
const openrouter = createOpenRouter({
  apiKey: process.env['OPEN_ROUTER_API_KEY'],
});

const chatChain = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate("{system_prompt}"),
  new MessagesPlaceholder("messages"),
]);

function normalizeMessage(message: any) {
  let role: string;
  let content: string;
  const roleMap: any = {
    'human': 'user',
    'ai': 'assistant',
  }
  if (message == null || typeof message !== 'object') {
    role = 'user';
    content = String(message ?? '');
  }
  else if (typeof message.content === 'string') {
    role = message.role ?? message.type ?? 'user';
    content = message.content;
  }
  else if (Array.isArray(message.content)) {
    role = message.role ?? message.type ?? 'user';
    content = message.content.map((block: any) => typeof block === 'string' ? block : block?.text ?? '').join('');
  }
  else {
    role = message.role ?? message.type ?? 'user';
    content = String(message.content ?? '');
  }
  if (role in roleMap) {
    role = String(roleMap[role]);
  }
  return {role: role, content: content} as ModelMessage;
}

const openRouterRunnable = RunnableLambda.from(async (promptMessages: ChatPromptValue) => {
  const messages: BaseMessage[] = promptMessages.toChatMessages()
  const normalized: ModelMessage[] = messages.map(normalizeMessage);
  const systemMessage = normalized.find((msg) => msg.role === 'system');
  const userMessages = normalized.filter((msg) => msg.role !== 'system');

  const model = getModelName();

  const result = streamText({
    model: openrouter(model),
    system: systemMessage?.content ?? '',
    temperature: 0.5,
    maxOutputTokens: 1000,
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
  model = "nvidia/nemotron-3-super-120b-a12b:free"
  model = "google/gemini-2.0-flash-001" // Pay 0.10 -> 0.40
  model = "mistralai/mistral-small-3.2-24b-instruct" // Pay 0.075 -> 0.20
  return model;
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const modelMessages = await toBaseMessages(messages)
    const prompts = await getPrompts();
    const systemPrompt = prompts.map((p: Prompt) => p.content).join('\n');
    const chain = chatChain.pipe(openRouterRunnable);
    const result = await chain.invoke({ system_prompt: systemPrompt, messages: modelMessages });
    return result.toUIMessageStreamResponse()
  } catch (error: any) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
