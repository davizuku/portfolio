export type Message = {
  role: "user" | "assistant" | "tool" | "system";
  content: string;
};

export type MessageWithThinking = Message & {
  finishedThinking?: boolean;
  think?: string;
};
