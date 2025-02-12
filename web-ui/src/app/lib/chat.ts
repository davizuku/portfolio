"use server";

export async function getResponse(messages: Message[]): Promise<Message> {
    const response = await makeApiCall({ messages: messages });
    const reader = response.body?.getReader();
    if (!reader) {
        throw new Error('Response body is not readable');
    }
    const decoder = new TextDecoder();
    let buffer = '';
    let outputTokens = [];
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            // Append new chunk to buffer
            buffer += decoder.decode(value, { stream: true });
            // console.log('Debug buffer: ', buffer);
            // Process complete lines from buffer
            while (true) {
                const lineEnd = buffer.indexOf('\n');
                if (lineEnd === -1) break;
                const line = buffer.slice(0, lineEnd).trim();
                buffer = buffer.slice(lineEnd + 1);
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') break;
                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0].delta.content;
                        if (content) {
                            // console.log('Debug content: ', content);
                            outputTokens.push(content);
                        }
                    } catch (e) {
                        // Ignore invalid JSON
                    }
                }
            }
        }
        return { role: "assistant", content: outputTokens.join('') };
    } finally {
        reader.cancel();
    }
}

export async function makeApiCall({ messages }: { messages: Message[] }) {
    const API_KEY_REF = process.env['OPEN_ROUTER_API_KEY'];

    let model = "";
    // model = "google/gemini-2.0-flash-lite-preview-02-05:free";
    // model = 'sophosympatheia/rogue-rose-103b-v0.2:free';
    model = "google/gemini-2.0-flash-001"; // Pay 0.1 -> 0.4
    model = "deepseek/deepseek-r1-distill-llama-8b"; // Pay 0.04 -> 0.04

    return await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_KEY_REF}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 300,
            temperature: 0.5,
            messages: [...messages],
            stream: true,
        }),
    });
}
