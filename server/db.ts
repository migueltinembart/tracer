import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, Client } from "pg";
import { env } from "./config/env";

export async function dbInit() {
  const pool = new Pool({
    connectionString: env.CONNECTION_STRING,
    ssl: true,
    host: "0.0.0.0",
    keepAlive: true,
    max: 5,
  });

  const client = pool.connect();

  return client;
}

const pool = await dbInit();

export const db = drizzle(pool);
