import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { sites } from 'db/entities';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { insertSiteZodSchema, siteCollectionResponseZodSchema } from '@server/modules/REST/sites/schemas';

export const sitesRouter = router({
  getMany: publicProcedure.output(siteCollectionResponseZodSchema).query(async () => {
    return await db.select().from(sites);
  }),
  getOneById: publicProcedure.input(z.number()).query(async (opts) => {
    return await db.select().from(sites).where(eq(sites.id, opts.input));
  }),
  insertOne: publicProcedure.input(insertSiteZodSchema).mutation(async (opts) => {
    await db.insert(sites).values(opts.input);
    return true;
  }),
});
