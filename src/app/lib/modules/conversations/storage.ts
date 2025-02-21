
import { getDatabaseConnection } from "@/app/lib/server-utils";
import { Message } from "ai";

export async function createConversation(metadata: any): Promise<string> {
    try {
        const client = await getDatabaseConnection();
        await client.connect();
        const result = await client.query(`
            INSERT INTO conversations(metadata, messages) VALUES ($1, '[]')
            ON CONFLICT (id)
            DO UPDATE SET metadata = EXCLUDED.metadata
            RETURNING id;
        `, [metadata]);
        return result.rows[0]['id'];
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error(`Failed to create conversation`);
    }
}

export async function updateMessages(conversationId: string, messages: Message[]) {
    try {
        const strMessages = JSON.stringify(messages.map((m: Message) => {
            return { "role": m.role, "content": m.content }
        }));
        const client = await getDatabaseConnection();
        await client.connect();
        await client.query(`
            UPDATE conversations SET messages = $2
            WHERE id = $1;
        `, [conversationId, strMessages]);
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error(`Failed to update conversation messages`);
    }
}
