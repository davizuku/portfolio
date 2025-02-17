"use client";

import { useEffect } from "react";
import Markdown from "react-markdown";
import { Bot, MessageSquare, Send, User2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useAssistant } from "@/app/contexts/AssistantContext";
import { useChat } from '@ai-sdk/react';
import { UIMessage } from "ai";

export function Chat() {
    // @see: https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat
    const { messages, input, handleInputChange, handleSubmit, append } = useChat({
        api: 'api/agent',
    });
    const { questions, answerQuestion } = useAssistant();
    useEffect(() => {
        if (questions.length > 0) {
            append({ role: "user", content: questions[0] })
            answerQuestion();
        }
    }, [questions]);

    return (
        <div className="h-full flex flex-col bg-gray-700">
            <div className="flex-grow overflow-y-auto">
                <div className="flex-1 p-4 container mx-auto max-w-4xl space-y-4 pb-32">
                    {messages
                        .filter(({ role }) => role === "user" || role === "assistant")
                        .map((m) => <AIMessage key={m.id} message={m} />)}
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
                                placeholder="Ask the assistant..."
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const AIMessage: React.FC<{ message: UIMessage }> = ({ message }) => {
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
                        {message.role === "user" ? <User2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        <span>{message.role === "user" ? "You" : "Assistant"}</span>
                    </span>
                </div>
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
