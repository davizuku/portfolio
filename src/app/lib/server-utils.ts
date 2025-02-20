"use server";

import { Client, ClientConfig } from "pg";

export async function getDatabaseConnection(): Promise<Client> {
    const clientConfig = {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        // Not a good practice, but needed to distinguish between environments
        ssl: process.env.POSTGRES_DATABASE == 'neondb' ? { "mode": 'required' } : undefined,
    } as ClientConfig;
    const client = new Client(clientConfig);
    return client
}
