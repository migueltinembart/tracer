import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { rack_roles } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@/server/db/auth";

const insertSchema = createInsertSchema(rack_roles);
const updateSchema = createSelectSchema(rack_roles)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const rack_roles_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: rack_roles.id,
          name: rack_roles.name,
          color: rack_roles.color,
          description: rack_roles.description,
          updated_at: rack_roles.updated_at,
          created_at: rack_roles.created_at,
          created_by: users,
          updated_by: users,
        })
        .from(rack_roles)
        .leftJoin(users, eq(rack_roles.created_by, users.id));
      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: rack_roles.id,
          name: rack_roles.name,
          color: rack_roles.color,
          description: rack_roles.description,
          updated_at: rack_roles.updated_at,
          created_at: rack_roles.created_at,
          created_by: users,
          updated_by: users,
        })
        .from(rack_roles)
        .leftJoin(users, eq(rack_roles.created_by, users.id))
        .where(eq(rack_roles.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const values = opts.input;
      values.created_by = opts.ctx.token.sub;
      values.updated_by = opts.ctx.token.sub;
      const result = await db.insert(rack_roles).values(values).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db
          .insert(rack_roles)
          .values(opts.input)
          .returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(rack_roles)
        .set({ ...opts.input, updated_at })
        .where(eq(rack_roles.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.number()).mutation(async (opts) => {
      const result = await db
        .delete(rack_roles)
        .where(eq(rack_roles.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(rack_roles)
        .where(inArray(rack_roles.id, opts.input));
      return result;
    }),
  }),
});
