"use client";

import { useEffect, useState } from "react";
import { streamAsyncIterator } from "@/app/lib/utils";

export default function Page() {
  const [buffer, setBuffer] = useState<string>("");
  useEffect( () => {
    const fetchStream = async () => {
      const response = await fetch('api/agent', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.body) return;
      const reader = response.body.getReader();
      for await (const value of streamAsyncIterator(reader)) {
        const { iteration, text } = JSON.parse(value);
        setBuffer((prev) => prev + text);
      }
    }
    fetchStream().catch(console.error);
    return () => {};
  }, []);

  return (<pre>Buffer: {buffer}</pre>
  );
}
