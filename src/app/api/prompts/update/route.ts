import { NextResponse } from "next/server";
import { addPrompt } from '@/app/lib/modules/prompts/storage';
import fs from 'fs';
import path from 'path';

/** Intended for local use only */

export async function GET() {
  const updatedPrompts = [];
  try {
    // Scan data folder for files of the form "\d-\w+\.md", concatenate all its contents using "\n" as separator into the systemPrompt variable.
    const dataFolderPath = path.join(process.cwd(), 'data');
    const filePattern = /^\d-(\w+)\.md$/;
    for (const file of fs.readdirSync(dataFolderPath)) {
      const matches = file.match(filePattern);
      if (matches) {
        const promptName = matches[1];
        const promptContent = fs.readFileSync(path.join(dataFolderPath, file), 'utf-8');
        addPrompt({ "name": promptName, "content": promptContent });
        updatedPrompts.push(promptName);
      }
    }
  } catch (error: any) {
    console.error("Error in /api/prompts/update:", error);
  }
  return NextResponse.json({"updatedPrompts": updatedPrompts});
}
