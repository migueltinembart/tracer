const client = new Pool({
  connectionString: env.CONNECTION_STRING,
  ssl: true,
});

export const db = drizzle(client);
