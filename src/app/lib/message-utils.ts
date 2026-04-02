import type { ModelMessage } from "ai";

export type NormalizedMessage = ModelMessage;

const roleMap: Record<string, ModelMessage['role']> = {
  human: 'user',
  ai: 'assistant',
};

export function normalizeMessage(message: any): ModelMessage {
  let role: ModelMessage['role'] = 'user';
  let content = '';

  if (message == null || typeof message !== 'object') {
    content = String(message ?? '');
  } else {
    const rawRole = message.role ?? message.type ?? 'user';
    const roleCandidate = typeof rawRole === 'string' ? rawRole : 'user';

    if (roleCandidate in roleMap) {
      role = roleMap[roleCandidate];
    } else if (['system', 'user', 'assistant', 'tool'].includes(roleCandidate)) {
      role = roleCandidate as ModelMessage['role'];
    } else {
      role = 'user';
    }

    if (typeof message.content === 'string') {
      content = message.content;
    } else if (Array.isArray(message.content)) {
      content = message.content
        .map((block: any) => (typeof block === 'string' ? block : String(block?.text ?? '')))
        .join('');
    } else if (Array.isArray(message.parts)) {
      content = message.parts
        .map((part: any) => (typeof part?.text === 'string' ? part.text : ''))
        .join('');
    } else {
      content = String(message.content ?? '');
    }
  }

  if (role in roleMap) {
    role = roleMap[role] ?? role;
  }

  return { role, content } as ModelMessage;
}
