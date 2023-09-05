import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { tenantGroups } from 'db/entities';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { insertTenantGroupZodSchema, tenantGroupCollectionResponseZodSchema } from '@server/modules/REST/tenantGroups/schemas';

export const tenantGroupsRouter = router({
  getMany: publicProcedure.output(tenantGroupCollectionResponseZodSchema).query(async () => {
    return await db.select().from(tenantGroups);
  }),
  getOneById: publicProcedure.input(z.number()).query(async (opts) => {
    return await db.select().from(tenantGroups).where(eq(tenantGroups.id, opts.input));
  }),
  insertOne: publicProcedure.input(insertTenantGroupZodSchema).mutation(async (opts) => {
    console.log(opts);
    const result = await db.insert(tenantGroups).values(opts.input).returning();
    return result[0];
  }),
});
