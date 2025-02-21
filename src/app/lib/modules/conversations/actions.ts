"use server";

import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";
import { createConversation, updateMessages } from "@/app/lib/modules/conversations/storage";
import { Message } from "ai";

export async function startConversation(): Promise<string> {
    const [headersList, cookieStore] = await Promise.all([
        headers(),
        cookies(),
    ]);
    const headersJson: any = {}
    headersList.forEach((value: string, key: string) => headersJson[key] = value);
    const agent = await userAgent({headers: headersList});
    const metadata = {
        'agent': agent,
        'headers': headersJson,
        'cookies': cookieStore.getAll(),
    };
    const conversationId = await createConversation(metadata)
    return conversationId;
}

export async function updateConversation(conversationId: string, messages: Message[]) {
    await updateMessages(conversationId, messages);
}
