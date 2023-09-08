import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { contactGroups } from 'db/entities';
import { z } from 'zod';
import { eq, inArray } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(contactGroups);

export const contactGroupsRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db.select().from(contactGroups);

      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db.select().from(contactGroups).where(eq(contactGroups, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(contactGroups).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(contactGroups).values(opts.input).returning();
      return result;
    }),
  }),
  update: router({
    one: publicProcedure.input(insertSchema.required()).mutation(async (opts) => {
      const result = await db
        .update(contactGroups)
        .set(opts.input)
        .where(eq(contactGroups.id, opts.input.id))
        .returning();
      return result;
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db.delete(contactGroups).where(eq(contactGroups.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db.delete(contactGroups).where(inArray(contactGroups.id, opts.input));
      return result;
    }),
  }),
});
