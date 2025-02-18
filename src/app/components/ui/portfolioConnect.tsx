import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface PortfolioConnectProps {
    title: string;
    description: string;
}

export default function PortfolioConnect({ title, description }: PortfolioConnectProps) {

    return (
        <div>
            <section className="min-h-screen md:min-h-[500px] w-full flex flex-col justify-center bg-primary">
                <div className="flex flex-col items-center justify-center gap-5">
                    <h1 className="text-3xl md:text-4xl text-secondary font-bold">{title}</h1>
                    <p className="text-secondary text-center italic m-auto w-2/3 md:w-1/2 text-balance">{description}</p>
                    <div className="flex space-x-4 text-2xl text-secondary">
                        <Link href="https://www.linkedin.com/in/david-alvarez-pons/" target="_blank"
                            rel="noopener noreferrer" className="text-white bg-[#0b66c2] hover:bg-[#024182]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                            <Image className="mr-3" src="/img/linkedin.svg" alt="linkedin icon" width={20} height={20}/>
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
