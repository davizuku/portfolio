import type { Metadata } from "next";
import "@/app/globals.css";
import { AssistantProvider } from "@/app/contexts/AssistantContext";

export const metadata: Metadata = {
  title: "David Álvarez Pons",
  description: "Portfolio and LLM integration for David Álvarez Pons's LinkedIn profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content"></meta>
      </head>
      <body className={`antialiased`}>
        <AssistantProvider>
          {children}
        </AssistantProvider>
      </body>
    </html>
  );
}
