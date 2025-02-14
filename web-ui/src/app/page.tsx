import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa"; // Import icons
import PortfolioSection from "@/app/components/ui/portfolioSection";
import PortfolioHeader from "@/app/components/ui/portfolioHeader";
import { AssistantProvider } from "@/app/contexts/AssistantContext";

export default function Page() {

    const profileImage = <Image src="/img/profile.jpg"
        alt="David Álvarez Pons"
        className="rounded-full"
        sizes="100%"
        width={100}
        height={100}
        style={{ width: "100%", height: "auto" }}
    />
    const contactLinks = [
        <Link
            key="linkedin"
            href="https://www.linkedin.com/in/david-alvarez-pons/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
        >
            <FaLinkedin />
        </Link>,
        <Link
            key="github"
            href="https://github.com/davizuku"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
        >
            <FaGithub />
        </Link>,
        <Link
            key="leetcode"
            href="https://leetcode.com/davizuku"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
        >
            <FaCode />
        </Link>,
    ];

    return (
        <div className="min-h-screen flex flex-col items-center overflow-hidden">
            <AssistantProvider>
            <main className="w-full flex flex-col">
                <PortfolioHeader
                    profileImage={profileImage}
                    contactLinks={contactLinks}
                    fullName="David Álvarez Pons"
                    bioDescription="Versatile Software Engineer with a passion for sustainable, scalable solutions and team growth."
                />
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

            </AssistantProvider>
            <footer className="w-full max-w-4xl text-center mt-8 py-4 text-gray-600">
                &copy; {new Date().getFullYear()} David Álvarez Pons. All rights reserved.
            </footer>
        </div>
    );
}
