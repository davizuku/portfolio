type Message = {
    role: "user" | "assistant" | "tool" | "system";
    content: string;
};

type MessageWithThinking = Message & {
    finishedThinking?: boolean;
    think?: string;
};
