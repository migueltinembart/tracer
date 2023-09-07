import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { tenantGroups } from 'db/entities';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(tenantGroups);

export const tenantGroupsRouter = router({
  getMany: publicProcedure.query(async () => {
    return await db.select().from(tenantGroups);
  }),
  getOneById: publicProcedure.input(z.number()).query(async (opts) => {
    return await db.select().from(tenantGroups).where(eq(tenantGroups.id, opts.input));
  }),
  insertOne: publicProcedure.input(insertSchema).mutation(async (opts) => {
    console.log(opts);
    const result = await db.insert(tenantGroups).values(opts.input).returning();
    return result[0];
  }),
});
