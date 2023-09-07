import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { siteGroups } from 'db/entities';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(siteGroups);

export const siteGroupsRouter = router({
  getMany: publicProcedure.query(async () => {
    return await db.select().from(siteGroups);
  }),
  getOneById: publicProcedure.input(z.number()).query(async (opts) => {
    return await db.select().from(siteGroups).where(eq(siteGroups.id, opts.input));
  }),
  insertOne: publicProcedure.input(insertSchema).mutation(async (opts) => {
    console.log(opts);
    const result = await db.insert(siteGroups).values(opts.input).returning();
    return result[0];
  }),
});
