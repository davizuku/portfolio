"use client";

import { useEffect, useRef, useState } from "react";
import { Chat } from "@/app/components/Chat"; // Import Chat component
import { BotMessageSquareIcon, X } from "lucide-react";
import { useAssistant } from "@/app/contexts/AssistantContext";
import { useMediaQuery } from 'usehooks-ts'
import { startConversation, updateConversation } from "@/app/lib/modules/conversations/actions";
import { UIMessage } from "ai";

export interface AssistantProps {
    title: string;
}

export default function Assistant({title}: AssistantProps) {
    const [wasOpened, setWasOpened] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [conversationId, setConversationId] = useState("");
    const [pendingMessages, setPendingMessages] = useState<UIMessage[]>([]);

    const isMobile = useMediaQuery('(max-width: 768px)')

    const conversationIdRef = useRef(conversationId);
    const pendingMessagesRef = useRef<UIMessage[]>([]);

    useEffect(() => {
        conversationIdRef.current = conversationId;
    }, [conversationId]);

    useEffect(() => {
        pendingMessagesRef.current = pendingMessages;
    }, [pendingMessages]);

    const saveConversation = async () => {
        if (!conversationIdRef.current || pendingMessagesRef.current.length === 0) {
            return;
        }

        try {
            await updateConversation(conversationIdRef.current, pendingMessagesRef.current);
        } catch (error) {
            console.error('Failed to save conversation on close:', error);
        }
    };

    const onMessageReceived = (messages: UIMessage[]) => {
        setPendingMessages(messages);
    }

    useEffect(() => {
        if (wasOpened) {
            const initConversation = async () => {
                const conversationId = await startConversation();
                setConversationId(conversationId);
            }
            initConversation().catch(console.error);
        }
    }, [wasOpened]);

    useEffect(() => {
        if (isOpen && isMobile) {
            window.document.body.style.overflow = "hidden";
        } else {
            window.document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (!conversationIdRef.current || pendingMessagesRef.current.length === 0) {
                return;
            }

            const data = JSON.stringify({
                conversationId: conversationIdRef.current,
                messages: pendingMessagesRef.current,
            });
            navigator.sendBeacon(
                '/api/conversations/save',
                new Blob([data], { type: 'application/json' }),
            );
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    const { questions, askQuestion } = useAssistant();
    useEffect(() => {
        if (questions.length > 0) {
            setWasOpened(true);
            setIsOpen(true);
        }
    }, [questions]);

    const closeChat = async () => {
        await saveConversation();
        setIsOpen(false);
    }

    const switchChatbot = async () => {
        if (isOpen) {
            await closeChat();
            return;
        }

        if (!wasOpened) {
            setWasOpened(true);
            askQuestion("Greetings 👋!");
        }
        setIsOpen(true);
    }

    return (
        <>
            <button
                onClick={switchChatbot}
                className={`fixed bottom-4 right-4 ${isOpen ? 'bg-black' : 'bg-accent'} text-white rounded-full p-4 shadow-lg z-10`}
            >
                <BotMessageSquareIcon className="h-6 w-6" />
            </button>

            <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 md:top-auto bottom-0 md:bottom-[80px] md:right-10 w-full md:w-[500px] h-full md:h-[80vh] z-20 overflow-hidden rounded-lg shadow-lg`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 bg-accent border-b border-gray-700">
                        <h2 className="text-lg md:text-xl text-primary">{title}</h2>
                        <button onClick={closeChat}>
                            <X className="h-6 w-6 text-primary" />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <Chat onMessageReceived={onMessageReceived}/>
                    </div>
                </div>
            </div>
        </>
    );
}
