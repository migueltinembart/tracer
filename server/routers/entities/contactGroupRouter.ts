import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { contact_groups } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(contact_groups);
const updateSchema = createSelectSchema(contact_groups)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const contact_groups_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db.select().from(contact_groups);

      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select()
        .from(contact_groups)
        .where(eq(contact_groups, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const values = opts.input;
      values.created_by = opts.ctx.token.sub;
      values.updated_by = opts.ctx.token.sub;
      const result = await db
        .insert(contact_groups)
        .values(values)
        .returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db
          .insert(contact_groups)
          .values(opts.input)
          .returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(contact_groups)
        .set({ ...opts.input, updated_at })
        .where(eq(contact_groups.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db
        .delete(contact_groups)
        .where(eq(contact_groups.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(contact_groups)
        .where(inArray(contact_groups.id, opts.input));
      return result;
    }),
  }),
});
