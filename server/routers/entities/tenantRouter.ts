import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { tenantGroups, tenants } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(tenants);
const updateSchema = createSelectSchema(tenants)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const tenantsRouter = router({
  select: router({
    all: privateProcedure.query(async () => {
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
    one: privateProcedure.input(z.number()).query(async (opts) => {
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
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(tenants).values(opts.input).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db.insert(tenants).values(opts.input).returning();
        return result[0];
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(tenants)
        .set({ ...opts.input, updatedAt })
        .where(eq(tenants.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db.delete(tenants).where(eq(tenants.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(tenants)
        .where(inArray(tenants.id, opts.input));
      return result;
    }),
  }),
});
