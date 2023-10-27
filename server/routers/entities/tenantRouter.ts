import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { tenant_groups, tenants } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@/server/db/auth";

const insertSchema = createInsertSchema(tenants);
const updateSchema = createSelectSchema(tenants)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const tenants_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: tenants.id,
          name: tenants.name,
          tenant_group: tenant_groups,
          description: tenants.description,
          created_at: tenants.created_at,
          updated_at: tenants.updated_at,
          created_by: users,
          updated_by: users,
        })
        .from(tenants)
        .leftJoin(users, eq(tenants.created_by, users.id))
        .leftJoin(tenant_groups, eq(tenants.tenant_group_id, tenant_groups.id));
      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: tenants.id,
          name: tenants.name,
          description: tenants.description,
          tenant_group: tenant_groups,
          created_at: tenants.created_at,
          updated_at: tenants.updated_at,
          created_by: users,
          updated_by: users,
        })
        .from(tenants)
        .leftJoin(users, eq(tenants.created_by, users.id))
        .leftJoin(tenant_groups, eq(tenants.tenant_group_id, tenant_groups.id))
        .where(eq(tenants.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const values = opts.input;
      values.created_by = opts.ctx.token.sub;
      values.updated_by = opts.ctx.token.sub;
      const result = await db.insert(tenants).values(values).returning();
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
        .set({ ...opts.input, updated_at })
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
