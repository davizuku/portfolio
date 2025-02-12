"use client";

import { useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import { Bot, Loader2, MessageSquare, Send, User2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { getResponse } from "@/app/lib/chat";
import { useAssistant } from "@/app/contexts/AssistantContext";

function useMessagesWithThinking(messages: Message[]) {
    let finishedThinking = true;
    return useMemo(
        () =>
            messages.map((m: Message): MessageWithThinking => {
                if (m.role === "assistant") {
                    if (m.content.includes("</think>")) {
                        finishedThinking = true;
                        return {
                            ...m,
                            finishedThinking: finishedThinking,
                            think: m.content
                                .split("</think>")[0]
                                .replace("</think>", "")
                                .replace("<think>", ""),
                            content: m.content.split("</think>")[1],
                        };
                    } else if (m.content.includes("<think>")) {
                        finishedThinking = false;
                        return {
                            ...m,
                            finishedThinking: finishedThinking,
                            think: m.content.replace("<think>", ""),
                            content: "",
                        };
                    } else {
                        return {
                            ...m,
                            finishedThinking: finishedThinking,
                            think: "",
                            content: m.content,
                        };
                    }
                }
                return m;
            }),
        [messages]
    );
}

export function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [systemPrompt, setSystemPrompt] = useState('');
    useEffect(() => {
        fetch('/api/prompt')
        .then((data) => data.json())
        .then((data) => setSystemPrompt(data.prompt));
    }, []);

    const { questions, answerQuestion } = useAssistant();
    useEffect(() => {
        if (questions.length > 0) {
            setMessages((prev) => [...prev, { role: "user", content: questions[0] }]);
            answerQuestion();
        }
    }, [questions]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInput("");
        setLoading(true);
        const messagesWithInput: Message[] = [
            ...messages,
            { role: "system", content: systemPrompt },
            { role: "user", content: input },
        ];
        const thinkingMessage: Message = { role: "assistant", content: "<think>" };
        setMessages([...messagesWithInput, thinkingMessage]);
        const response = await getResponse(messagesWithInput);
        setMessages([
            ...messagesWithInput,
            {
                role: "assistant",
                content: response.content,
            },
        ]);
        setLoading(false);
    };

    const messagesWithThinkingSplit = useMessagesWithThinking(messages);

    return (
        <div className="h-full flex flex-col bg-gray-700">
            <div className="flex-grow overflow-y-auto">
                <div className="flex-1 p-4 container mx-auto max-w-4xl space-y-4 pb-32">
                    {messagesWithThinkingSplit
                        .filter(({ role }) => role === "user" || role === "assistant")
                        .map((m, index) => <AIMessage key={index} message={m} />)}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
                <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                className="flex-1 bg-gray-900 border-gray-700 text-gray-100 pl-10"
                                value={input}
                                disabled={loading}
                                placeholder="Ask the assistant..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const AIMessage: React.FC<{ message: MessageWithThinking }> = ({ message }) => {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <div
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[80%] rounded-lg p-4 ${message.role === "user"
                    ? "bg-primary text-black"
                    : "bg-gray-800 text-gray-100"
                    }`}
            >
                <div className="flex items-center gap-2 mb-2" style={{ justifyContent: "space-between" }}>
                    <span className="text-sm font-medium" style={{ display: "flex", gap: 10 }}>
                        {message.role === "user" ? (
                            <User2 className="h-4 w-4" />
                        ) : (
                            !message.finishedThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />
                        )}

                        <span>{message.role === "user" ? "You" : "David's Assistant"}</span>
                    </span>
                    <span>
                        {/* Consider this block when streaming from the backend to the frontend */}
                        {false && message.role === "assistant" && (
                            <span
                                style={{ cursor: "pointer", fontStyle: "italic", fontSize: "12px" }}
                                onClick={() => setCollapsed((c) => !c)}
                            >
                                {collapsed ? "show thoughts" : "hide thoughts"}
                            </span>
                        )}
                    </span>
                </div>

                {message.role === "assistant" && !message.finishedThinking && (
                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-sm">Thinking...</span>
                    </div>
                )}

                {message.think && (
                    <div style={{ display: collapsed ? "none" : "block" }} className="mb-2 text-sm italic border-l-2 border-gray-600 pl-2 py-1 text-gray-300">
                        <Markdown>{message.think}</Markdown>
                    </div>
                )}
                <article
                    className={`prose max-w-none ${message.role === "user"
                        ? "prose-invert prose-p:text-black prose-headings:text-black prose-strong:text-black prose-li:text-black"
                        : "prose-invert prose-p:text-gray-100 prose-headings:text-gray-100 prose-strong:text-gray-100 prose-li:text-gray-100"
                        }`}
                >
                    <Markdown>{message.content}</Markdown>
                </article>
            </div>
        </div>
    )
}
