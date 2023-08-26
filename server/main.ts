import { buildServer } from './utils/server';
import { env } from './config/env';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './utils/db';

async function main() {
  //Register swagger
  const app = await buildServer();
  // Migrate db for changes

  await migrate(db, { migrationsFolder: env.MIGRATION_FOLDER });

  await app.listen({
    port: env.PORT,
    host: env.HOST,
  });
}

main();
