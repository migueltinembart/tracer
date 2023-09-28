import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, Client } from "pg";
import { env } from "./config/env";

const client = new Client({
  connectionString: env.CONNECTION_STRING,
  ssl: true,
  host: "0.0.0.0",
});

await client.connect();

export const db = drizzle(client);
