import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { contactGroups } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(contactGroups);
const updateSchema = createSelectSchema(contactGroups)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const contactGroupsRouter = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db.select().from(contactGroups);

      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select()
        .from(contactGroups)
        .where(eq(contactGroups, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db
        .insert(contactGroups)
        .values(opts.input)
        .returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db
          .insert(contactGroups)
          .values(opts.input)
          .returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(contactGroups)
        .set({ ...opts.input, updatedAt })
        .where(eq(contactGroups.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db
        .delete(contactGroups)
        .where(eq(contactGroups.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(contactGroups)
        .where(inArray(contactGroups.id, opts.input));
      return result;
    }),
  }),
});
