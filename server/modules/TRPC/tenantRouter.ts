import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { tenants } from 'db/entities';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const tenantsRouter = router({
  getMany: publicProcedure.query(async () => {
    return await db.select().from(tenants);
  }),
  getOneById: publicProcedure.input(z.number()).query(async (opts) => {
    return await db.select().from(tenants).where(eq(tenants.id, opts.input));
  }),
  
});
