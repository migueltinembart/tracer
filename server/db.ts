import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./config/env";

const client = new Pool({
  connectionString: env.CONNECTION_STRING,
  ssl: true,
});

export const db = drizzle(client);
