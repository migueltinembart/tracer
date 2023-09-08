import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { tenantGroups } from 'db/entities';
import { z } from 'zod';
import { eq, inArray } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(tenantGroups);

export const tenantGroupsRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db
        .select({
          id: tenantGroups.id,
          name: tenantGroups.name,
          createdAt: tenantGroups.createdAt,
          updatedAt: tenantGroups.updatedAt,
        })
        .from(tenantGroups);
      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: tenantGroups.id,
          name: tenantGroups.name,
          createdAt: tenantGroups.createdAt,
          updatedAt: tenantGroups.updatedAt,
        })
        .from(tenantGroups)
        .where(eq(tenantGroups.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(tenantGroups).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(tenantGroups).values(opts.input).returning();
      return result[0];
    }),
  }),
  update: router({
    one: publicProcedure.input(insertSchema.required()).mutation(async (opts) => {
      const result = await db
        .update(tenantGroups)
        .set(opts.input)
        .where(eq(tenantGroups.id, opts.input.id))
        .returning();
      return result;
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db.delete(tenantGroups).where(eq(tenantGroups.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db.delete(tenantGroups).where(inArray(tenantGroups.id, opts.input));
      return result;
    }),
  }),
});
