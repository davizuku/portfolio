
import { Prompt } from "@/app/lib/modules/prompts/definitions";
import { unstable_noStore as noStore } from "next/cache";
import { getDatabaseConnection } from "@/app/lib/server-utils";

export async function getPrompts(): Promise<Prompt[]> {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
        const client = await getDatabaseConnection();
        await client.connect();
        const data = await client.query(`
            SELECT id, name, content, updated_at
            FROM prompts
        `);
        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error(`Failed to find prompts`);
    }
}

export async function addPrompt(prompt: Prompt) {
    try {
        const client = await getDatabaseConnection();
        await client.connect();
        await client.query(`
            INSERT INTO prompts(name, content) VALUES ($1, $2)
            ON CONFLICT (name)
            DO UPDATE SET content = EXCLUDED.content
        `, [prompt.name, prompt.content]);
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error(`Failed to insert prompt`);
    }
}
