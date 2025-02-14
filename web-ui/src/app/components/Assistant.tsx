"use client";

import React, { useEffect, useState } from "react";
import { Chat } from "@/app/components/Chat"; // Import Chat component
import { BotMessageSquareIcon, X } from "lucide-react";
import { useAssistant } from "@/app/contexts/AssistantContext";

export interface AssistantProps {}

export default function Assistant({}: AssistantProps) {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            window.document.body.style.overflow = "hidden";
        } else {
            window.document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const { questions } = useAssistant();
    useEffect(() => {
        if (questions.length > 0) {
            setIsOpen(true);
        }
    }, [questions]);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-4 right-4 ${isOpen ? 'bg-black' : 'bg-accent'} text-white rounded-full p-4 shadow-lg z-10`}
            >
                <BotMessageSquareIcon className="h-6 w-6" />
            </button>

            <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 md:top-auto bottom-0 md:bottom-[80px] md:right-10 w-full md:w-[500px] h-full md:h-[80vh] z-20 overflow-hidden rounded-lg shadow-lg`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 bg-accent border-b border-gray-700">
                        <h2 className="text-lg md:text-xl text-primary">Chat Assistant</h2>
                        <button onClick={() => setIsOpen(false)}>
                            <X className="h-6 w-6 text-primary" />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <Chat />
                    </div>
                </div>
            </div>
        </>
    );
}
