import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { tenantGroups, tenants } from 'db/entities';
import { z } from 'zod';
import { eq, inArray } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(tenants);

export const tenantsRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db
        .select({
          id: tenants.id,
          name: tenants.name,
          tenantGroup: tenantGroups,
          createdAt: tenants.createdAt,
          updatedAt: tenants.updatedAt,
        })
        .from(tenants)
        .leftJoin(tenantGroups, eq(tenants.tenantGroupId, tenantGroups.id));
      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: tenants.id,
          name: tenants.name,
          tenantGroup: tenantGroups,
          createdAt: tenants.createdAt,
          updatedAt: tenants.updatedAt,
        })
        .from(tenants)
        .leftJoin(tenantGroups, eq(tenants.tenantGroupId, tenantGroups.id))
        .where(eq(tenants.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(tenants).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(tenants).values(opts.input).returning();
      return result[0];
    }),
  }),
  update: router({
    one: publicProcedure.input(insertSchema.required()).mutation(async (opts) => {
      const result = await db.update(tenants).set(opts.input).where(eq(tenants.id, opts.input.id)).returning();
      return result;
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db.delete(tenants).where(eq(tenants.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db.delete(tenants).where(inArray(tenants.id, opts.input));
      return result;
    }),
  }),
});
