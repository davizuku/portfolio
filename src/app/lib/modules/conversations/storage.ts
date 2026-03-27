
import { getDatabaseConnection } from "@/app/lib/server-utils";
import { UIMessage } from "ai";

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

export async function updateMessages(conversationId: string, messages: UIMessage[]) {
    try {
        const strMessages = JSON.stringify(messages.map((m: UIMessage) => {
            return { "role": m.role, "content": m.parts.filter(p => p.type === 'text').map(p => p.text).join() }
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
