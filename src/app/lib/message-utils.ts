export type NormalizedMessage = {
  role: string;
  content: string;
};

const roleMap: Record<string, string> = {
  human: 'user',
  ai: 'assistant',
};

export function normalizeMessage(message: any): NormalizedMessage {
  let role = 'user';
  let content = '';

  if (message == null || typeof message !== 'object') {
    content = String(message ?? '');
  } else {
    role = String(message.role ?? message.type ?? 'user');

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

  return { role, content };
}
