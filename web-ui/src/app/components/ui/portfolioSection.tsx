"use client";

import React, { useEffect, useRef } from "react";
import { BotMessageSquareIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface PortfolioSectionProps {
  title: string;
  description: string;
  imagePath: string;
  orientation: "left" | "right";
  palette?: "primary" | "secondary";
}

export default function PortfolioSection({ title, description, imagePath, orientation, palette }: PortfolioSectionProps) {
    const sectionRef = useRef(null);
    const sectionImgRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            const sectionImg = sectionImgRef.current;
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

    let textAlignment = orientation == 'left' ? 'lg:text-left' : 'lg:text-right';
    let itemsAlignment = orientation == 'left' ? 'lg:items-start' : 'lg:items-end';
    let bgColor = palette == 'primary' ? 'bg-primary' : 'bg-secondary';
    let textColor = palette == 'primary' ? 'text-secondary' : 'text-primary';
    let btnBgColor = palette == 'primary' ? 'bg-secondary' : 'bg-primary';
    let btnTextColor = palette == 'primary' ? 'text-primary' : 'text-secondary';
    let btnAccentColor = palette == 'primary' ? 'hover:bg-accent' : 'hover:bg-accent-foreground';

    return (
        <section id="experience" ref={sectionRef}
            className={`min-h-screen md:min-h-[500px] w-full ${bgColor} ${textColor}
                            flex flex-col ${orientation == 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-5`}
        >
            <div className={`col-span-3 grow flex flex-col items-center ${itemsAlignment} justify-center gap-5 p-6`}>
                <h2 className={`text-2xl font-semibold w-full ${textAlignment}`}>{title}</h2>
                <p className={`text-center ${textAlignment}`}>{description}</p>
                <p>
                    <Link href="#assistant" className={`mt-4 px-4 py-2 ${btnBgColor} ${btnTextColor} rounded ${btnAccentColor} ${textAlignment}`}>
                        <BotMessageSquareIcon className="w-4 h-4 inline" /> Ask the assistant
                    </Link>
                </p>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center">
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
