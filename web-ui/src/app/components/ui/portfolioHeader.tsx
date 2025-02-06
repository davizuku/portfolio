
"use client";

import React, { useEffect, useRef, useState, JSX } from "react";
import Link from "next/link";

export interface PortfolioHeaderProps {
    profileImage: JSX.Element;
    contactLinks: JSX.Element[];
    fullName: string;
    bioDescription: string;
}

export default function PortfolioHeader({ profileImage, contactLinks, fullName, bioDescription }: PortfolioHeaderProps) {

    const bioSection = useRef(null);
    const [showHeader, setShowHeader] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = bioSection.current as HTMLElement | null;
            if (section) {
                setShowHeader(window.scrollY >= section.clientHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <div>
            <header className={`${showHeader ? '' : 'hidden'} fixed bg-primary-foreground z-10 top-0 min-w-full flex justify-between items-center p-2 drop-shadow-2xl`}>
                <div className="rounded-full justify-center w-10 md:w-12"><Link href="#">{profileImage}</Link></div>
                <h1 className="text-center text-xl md:text-3xl font-bold">David Álvarez Pons</h1>
                <div className="flex space-x-4 text-sm md:text-xl text-primary">{contactLinks}</div>
            </header>
            <section ref={bioSection} className="w-full h-screen flex flex-col justify-center bg-secondary">
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="rounded-full justify-center w-2/3 md:w-1/2 lg:w-1/3 relative">{profileImage}</div>
                    <h1 className="text-3xl md:text-4xl text-primary font-bold">{fullName}</h1>
                    <p className="text-primary text-center italic m-auto w-2/3 md:w-1/2 text-balance">{bioDescription}</p>
                    <div className="flex space-x-4 text-2xl text-primary">{contactLinks}</div>
                </div>
            </section>
            <div className="absolute bottom-10 w-full text-center animate-bounce opacity-50 text-xs md:text-base">
                <p className="text-primary">Scroll down to learn more</p>
            </div>
        </div>
    );
}
