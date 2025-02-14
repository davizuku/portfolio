'use client';

import React, { createContext, useContext, useState, FC, PropsWithChildren } from "react";
import Assistant from "@/app/components/Assistant";

type AssistantContextValue = {
  questions: string[];
  askQuestion: (question: string) => void;
  answerQuestion: () => void;
};

export const AssistantContext = createContext<AssistantContextValue | undefined>(undefined);

export const AssistantProvider: FC<PropsWithChildren> = ({ children }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const askQuestion: AssistantContextValue["askQuestion"] = (question: string) => {
    setQuestions((prev) => [...prev, question]);
  }
  const answerQuestion: AssistantContextValue["answerQuestion"] = () => {
    setQuestions((prev) => prev.slice(1));
  }
  return (
    <AssistantContext.Provider value={{ questions, askQuestion, answerQuestion }}>
    {children}
      <Assistant title="Chat Assistant" />
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
    const context = useContext(AssistantContext);
  if (!context) {
    throw new Error("useAssistant must be used within an AssistantProvider");
  }
  return context;
}
