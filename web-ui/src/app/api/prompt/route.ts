import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { readdirSync } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    // Read all files matching `\d-(?<section>).md` under the `./data` folder.
    // Save their contents in a dictionary files[<section>] = <file-content>
    const files: { [key: string]: string } = {};
    const dataDir = '/data';
    const fileNames = readdirSync(dataDir);

    fileNames.forEach(fileName => {
        const match = fileName.match(/^(\d+)-(?<section>.+)\.md$/);
        if (match && match.groups && match.groups.section) {
            const section = match.groups.section;
            const filePath = path.join(dataDir, fileName);
            const content = readFileSync(filePath, 'utf-8');
            files[section] = content;
        }
    });

    let text = "The following markdown documents describe the LinkedIn sections of David Álvarez Pons: \n";
    text += "```markdown\n" + files['bio'] + "```\n";
    text += "```markdown\n" + files['experience'] + "```\n";
    text += "```markdown\n" + files['projects'] + "```\n";
    text += "```markdown\n" + files['certifications'] + "```\n";
    text += "```markdown\n" + files['recommendations'] + "```\n";
    text += "Considering the previous documents, here is how you should behave: \n" + files['prompt'] + "\n";

    return NextResponse.json({prompt: text});
  } catch (error: any) {
    console.error("Error in /api/prompt:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
