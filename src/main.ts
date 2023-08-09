import { buildServer } from 'utils/server';
import { env } from 'config/env';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from 'utils/db';

async function main() {
  const app = await buildServer();

  //Register swagger

  // Migrate db for changes

  await migrate(db, { migrationsFolder: env.MIGRATION_FOLDER })
    .catch((e) => {
      if (!e) {
        app.log.info("success")
      }
      app.log.error(e, 'Migration failed');
    })

  app.listen({
    port: env.PORT,
    host: env.HOST,
  });
}

main();
