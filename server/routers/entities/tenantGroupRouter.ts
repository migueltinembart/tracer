import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { tenant_groups } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(tenant_groups);
const updateSchema = createSelectSchema(tenant_groups)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const tenant_groups_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: tenant_groups.id,
          name: tenant_groups.name,
          created_at: tenant_groups.created_at,
          updated_at: tenant_groups.updated_at,
        })
        .from(tenant_groups);
      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: tenant_groups.id,
          name: tenant_groups.name,
          created_at: tenant_groups.created_at,
          updated_at: tenant_groups.updated_at,
        })
        .from(tenant_groups)
        .where(eq(tenant_groups.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db
        .insert(tenant_groups)
        .values(opts.input)
        .returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db
          .insert(tenant_groups)
          .values(opts.input)
          .returning();
        return result[0];
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(tenant_groups)
        .set({ ...opts.input, updated_at })
        .where(eq(tenant_groups.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db
        .delete(tenant_groups)
        .where(eq(tenant_groups.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(tenant_groups)
        .where(inArray(tenant_groups.id, opts.input));
      return result;
    }),
  }),
});
