import { buildServer } from './utils/server';
import { env } from './config/env';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './utils/db';
import { DatabaseError } from 'pg';

async function main() {
  //Register swagger
  const app = await buildServer();
  // Migrate db for changes

  await migrate(db, { migrationsFolder: env.MIGRATION_FOLDER });

  app.listen({
    port: env.PORT,
    host: env.HOST,
  });
}

main();
