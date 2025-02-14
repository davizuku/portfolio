"use client";

import React, { useEffect, useRef, JSX } from "react";
import { BotMessageSquareIcon } from "lucide-react";
import Image from "next/image";
import { useAssistant } from "@/app/contexts/AssistantContext";

export interface PortfolioSectionProps {
  title: string;
  description: string | JSX.Element;
  imagePath: string;
  orientation: "left" | "right";
  palette?: "primary" | "secondary";
}

export default function PortfolioSection({ title, description, imagePath, orientation, palette }: PortfolioSectionProps) {
    const sectionRef = useRef(null);
    const sectionImgRef = useRef(null);

    const { askQuestion } = useAssistant();

    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current as HTMLElement | null;
            const sectionImg = sectionImgRef.current as HTMLElement | null;
            if (section && sectionImg) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    sectionImg.classList.add(`animate-slide-in-${orientation}`);
                } else {
                    sectionImg.classList.remove(`animate-slide-in-${orientation}`);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textAlignment = orientation == 'left' ? 'md:text-left' : 'md:text-right';
    const itemsAlignment = orientation == 'left' ? 'md:items-start' : 'md:items-end';
    const bgColor = palette == 'primary' ? 'bg-primary' : 'bg-secondary';
    const textColor = palette == 'primary' ? 'text-secondary' : 'text-primary';
    const btnBgColor = palette == 'primary' ? 'bg-secondary' : 'bg-primary';
    const btnTextColor = palette == 'primary' ? 'text-primary' : 'text-secondary';
    const btnAccentColor = palette == 'primary' ? 'hover:bg-accent' : 'hover:bg-accent-foreground';

    return (
        <section id="experience" ref={sectionRef}
            className={`min-h-screen md:min-h-[500px] w-full ${bgColor} ${textColor}
                            flex flex-col ${orientation == 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-5`}
        >
            <div className={`col-span-3 grow flex flex-col items-center ${itemsAlignment} justify-center gap-5 p-6`}>
                <h2 className={`text-2xl font-semibold w-full text-center ${textAlignment}`}>{title}</h2>
                <div className={`text-center ${textAlignment}`}>{description}</div>
                <p>
                    <button onClick={() => {
                        askQuestion('Ask the assistant about: ' + title);
                    }} className={`mt-4 px-4 py-2 ${btnBgColor} ${btnTextColor} rounded ${btnAccentColor} ${textAlignment}`}>
                        <BotMessageSquareIcon className="w-4 h-4 inline" /> Ask the assistant
                    </button>
                </p>
            </div>
            <div className="w-full md:w-3/5 lg:w-1/3 flex flex-col items-center justify-center">
                <div ref={sectionImgRef} className="flex-none relative w-full shadow-lg transition-transform duration-500 transform translate-x-full">
                    <Image
                        alt={title}
                        src={imagePath}
                        sizes="100%"
                        width={100}
                        height={100}
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
            </div>
        </section>
    );
}
