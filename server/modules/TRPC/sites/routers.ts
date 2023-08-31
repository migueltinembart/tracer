import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { sites } from 'db/entities';

export const sitesRouter = router({
  get: publicProcedure.query(async () => {
    return await db.select().from(sites);
  }),
});

