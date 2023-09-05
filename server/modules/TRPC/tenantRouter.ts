import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { tenants } from 'db/entities';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { insertTenantZodSchema, tenantCollectionResponseZodSchema } from '@server/modules/REST/tenants/schemas';

export const sitesRouter = router({
  getMany: publicProcedure.output(tenantCollectionResponseZodSchema).query(async () => {
    return await db.select().from(tenants);
  }),
  getOneById: publicProcedure.input(z.number()).query(async (opts) => {
    return await db.select().from(tenants).where(eq(tenants.id, opts.input));
  }),
  insertOne: publicProcedure.input(insertTenantZodSchema).mutation(async (opts) => {
    console.log(opts);
    const result = await db.insert(tenants).values(opts.input).returning();
    return result[0];
  }),
});
