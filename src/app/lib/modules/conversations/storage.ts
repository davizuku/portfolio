
import { getDatabaseConnection } from "@/app/lib/server-utils";
import { UIMessage } from "ai";
import { normalizeMessage, type NormalizedMessage } from "@/app/lib/message-utils";

export async function createConversation(metadata: any): Promise<string> {
    try {
        const client = await getDatabaseConnection();
        await client.connect();
        const result = await client.query(`
            INSERT INTO conversations(metadata, messages) VALUES ($1, $2)
            ON CONFLICT (id)
            DO UPDATE SET metadata = EXCLUDED.metadata
            RETURNING id;
        `, [metadata, JSON.stringify([{ role: 'system', content: 'in progress' }])]);
        return result.rows[0]['id'];
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error(`Failed to create conversation`);
    }
}

export async function updateMessages(conversationId: string, messages: Array<UIMessage | NormalizedMessage>) {
    try {
        const strMessages = JSON.stringify(messages.map(normalizeMessage));
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
