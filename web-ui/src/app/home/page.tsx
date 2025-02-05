import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa"; // Import icons
import PortfolioSection from "../components/ui/portfolioSection";


export default function Home() {


    return (
        <div className="min-h-screen flex flex-col items-center">
            <header className="hidden w-full max-w-4xl flex justify-between items-center py-4">
                <h1 className="text-3xl font-bold">David Álvarez Pons</h1>
            </header>

            <main className="w-full flex flex-col">
                <section id="bio" className="w-full h-screen flex flex-col justify-center bg-secondary">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <div className="rounded-full justify-center w-2/3 md:w-1/2 lg:w-1/3 relative">
                            <Image src="/img/profile.jpg" alt="David Álvarez Pons"
                                className="rounded-full"
                                sizes="100%"
                                width={100}
                                height={100}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </div>
                        <h1 className="text-3xl md:text-4xl text-primary font-bold">David Álvarez Pons</h1>
                        <p className="text-primary text-center italic m-auto w-2/3 md:w-1/2 text-balance">
                            Versatile Software Engineer with a passion for sustainable, scalable solutions and team growth.
                        </p>
                        <div className="flex space-x-4 text-primary">
                            <Link
                                href="https://www.linkedin.com/in/david-alvarez-pons/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white"
                            >
                                <FaLinkedin size={24} />
                            </Link>
                            <Link
                                href="https://github.com/davizuku"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white"
                            >
                                <FaGithub size={24} />
                            </Link>
                            <Link
                                href="https://leetcode.com/davizuku"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white"
                            >
                                <FaCode size={24} />
                            </Link>
                        </div>
                    </div>
                    <div className="absolute bottom-10 w-full text-center animate-bounce opacity-50 text-xs md:text-base">
                        <p className="text-primary">Scroll down to learn more</p>
                    </div>
                </section>
                <PortfolioSection
                    title="Experience"
                    description="13+ years in the software industry, including AI, private banking, public sector, business applications (CRM & ERP), and embedded systems."
                    imagePath="/img/experience.png"
                    orientation="right"
                    palette="primary"
                />
                <PortfolioSection
                    title="Education & Certifications"
                    description="Bachelor's in Computer Science. Continuous learner with certifications in data structures, algorithms, and cloud technologies."
                    imagePath="/img/education.png"
                    orientation="left"
                    palette="secondary"
                />
                <PortfolioSection
                    title="Projects"
                    description="Showcasing AI, cloud computing, and software engineering expertise through hands-on projects."
                    imagePath="/img/projects.png"
                    orientation="right"
                    palette="primary"
                />
                <PortfolioSection
                    title="Skills"
                    description={<ul className="list-disc list-inside">
                        <li><b>Industry Knowledge</b>: Artificial Intelligence (NLP & ML), Data Analysis, Architectural Design, Project Management, TDD</li>
                        <li><b>Tools & Tech</b>: Backend (Python, PHP, Node.js), Frontend (Next.js, React, Vue), Infrastructure (MySQL, Docker, AWS)</li>
                        <li><b>Interpersonal</b>: Attention to detail, Critical thinking, Problem solving, Team Work, Leadership, Organization</li>
                    </ul>}
                    imagePath="/img/skills.png"
                    orientation="left"
                    palette="secondary"
                />
            </main>

            <footer className="w-full max-w-4xl text-center mt-8 py-4 text-gray-600">
                &copy; {new Date().getFullYear()} David Álvarez Pons. All rights reserved.
            </footer>
        </div>
    );
}
