export async function chat({ messages }: { messages: Message[] }) {
    return fetch("http://127.0.0.1:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "mario",
            streaming: true,
            options: {
                temperature: 0.1,
                repeat_penalty: 1.2,
                numa: true, // testing for ARM
            },
            messages: [...messages],
        }),
    });
}
