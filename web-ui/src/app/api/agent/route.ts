import { streamAsyncIterator } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = process.env['LINKEDIN_AGENT_API_URL'];
    if (!url) throw new Error('Missing URL for LinkedIn Agent API');
    const newBody = await req.json()
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBody),
      });
    if (!response.body) throw new Error('Error requesting data to upstream');
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const value of streamAsyncIterator(reader)) {
          controller.enqueue(value);
        }
        controller.close();
      }
    })
    return new NextResponse(stream);
  } catch (error: any) {
    console.error("Error in /api/stream:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
