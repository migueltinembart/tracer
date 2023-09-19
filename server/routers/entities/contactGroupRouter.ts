import { publicProcedure, router } from "@/server/trpc";
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
    all: publicProcedure.query(async () => {
      const result = await db.select().from(contactGroups);

      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select()
        .from(contactGroups)
        .where(eq(contactGroups, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db
        .insert(contactGroups)
        .values(opts.input)
        .returning();
      return result[0];
    }),
    many: publicProcedure
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
    one: publicProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(contactGroups)
        .set({ ...opts.input, updatedAt })
        .where(eq(contactGroups.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db
        .delete(contactGroups)
        .where(eq(contactGroups.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(contactGroups)
        .where(inArray(contactGroups.id, opts.input));
      return result;
    }),
  }),
});
