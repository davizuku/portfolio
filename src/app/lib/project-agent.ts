import { ChatOpenAI } from "@langchain/openai";
import { createAgent, tool } from "langchain";
import { z } from "zod";
import { getDatabaseConnection } from "@/app/lib/server-utils";

const projectTerms = /\b(projects?|developed|built|tech(?:nologies|nology)?|php|python|javascript|node(?:\.js)?|typescript)\b/i;

export function isProjectQuery(question: string): boolean {
  return projectTerms.test(question);
}

function createProjectAgent() {
  const sqlDbQuery = tool(
    async ({ query }) => {
      const sql = query
        .replace(/```sql|```/gi, "")
        .trim()
        .replace(/;+$/, "");

      if (
        !/^select\b/i.test(sql) ||
        /;|\b(insert|update|delete|drop|alter|truncate|create|grant|revoke)\b/i.test(sql) ||
        !/\bprojects\b/i.test(sql) ||
        /\b(from|join)\s+(?!projects\b)/i.test(sql) ||
        /\b(information_schema|pg_catalog|pg_[a-z_]+)\b/i.test(sql)
      ) {
        throw new Error("Only a single read-only SELECT against the projects table is allowed.");
      }

      const client = await getDatabaseConnection();
      await client.connect();
      try {
        const result = await client.query(sql);
        return JSON.stringify(result.rows);
      } finally {
        await client.end();
      }
    },
    {
      name: "sql_db_query",
      description: "Execute a read-only PostgreSQL SELECT against the projects table and return JSON rows.",
      schema: z.object({
        query: z.string().describe("A syntactically correct PostgreSQL SELECT query using only the projects table."),
      }),
    },
  );

  const model = new ChatOpenAI({
    model: "qwen/qwen3.7-flash",
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    temperature: 0,
    maxTokens: 800,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  return createAgent({
    model,
    tools: [sqlDbQuery],
    systemPrompt: `You translate portfolio project questions into PostgreSQL queries.
You have access to only the projects table with these columns: id, linkedin_id, title, company, started_at, ended_at, duration, description, skills (text[]), metadata (jsonb), updated_at.
Always call sql_db_query before answering. Use PostgreSQL array operators such as skills @> ARRAY['PHP'] or EXISTS with unnest(skills) for skill matching, and use case-insensitive matching when appropriate.
Only generate a single read-only SELECT. Select only columns relevant to the question and limit lists to 20 rows unless the user asks for a count.
Return the tool result without adding prose; the application will use it as context for the portfolio assistant.`,
  });
}

export async function getProjectContext(question: string): Promise<string> {
  const agent = createProjectAgent();
  const result = await agent.invoke({
    messages: [{ role: "user", content: question }],
  });
  const toolMessages = (result.messages as Array<{ type?: string; content?: unknown }>)
    .filter((message) => message.type === "tool")
    .map((message) => typeof message.content === "string" ? message.content : JSON.stringify(message.content));

  if (toolMessages.length === 0) {
    throw new Error("The project SQL agent did not return database results.");
  }

  return toolMessages.join("\n");
}
