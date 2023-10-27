import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { site_groups } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@/server/db/auth";

const insertSchema = createInsertSchema(site_groups);
const updateSchema = createSelectSchema(site_groups)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const site_groups_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: site_groups.id,
          name: site_groups.name,
          description: site_groups.description,
          created_by: users,
          updated_by: users,
          created_at: site_groups.created_at,
          updated_at: site_groups.updated_at,
        })
        .from(site_groups)
        .leftJoin(users, eq(site_groups.created_by, users.id));
      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: site_groups.id,
          name: site_groups.name,
          description: site_groups.description,
          created_by: users,
          updated_by: users,
          created_at: site_groups.created_at,
          updated_at: site_groups.updated_at,
        })
        .from(site_groups)
        .leftJoin(users, eq(site_groups.created_by, users.id))
        .where(eq(site_groups.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const values = opts.input;
      values.created_by = opts.ctx.token.sub;
      values.updated_by = opts.ctx.token.sub;
      const result = await db
        .insert(site_groups)
        .values(values)
        .returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db
          .insert(site_groups)
          .values(opts.input)
          .returning();
        return result[0];
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(site_groups)
        .set({ ...opts.input, updated_at })
        .where(eq(site_groups.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db
        .delete(site_groups)
        .where(eq(site_groups.id, opts.input))
        .returning();
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(site_groups)
        .where(inArray(site_groups.id, opts.input));
      return result;
    }),
  }),
});
