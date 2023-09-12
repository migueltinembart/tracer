import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { siteGroups } from 'db/entities';
import { z } from 'zod';
import { eq, inArray } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(siteGroups);

export const siteGroupsRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db.select().from(siteGroups);

      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db.select().from(siteGroups).where(eq(siteGroups.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(siteGroups).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(siteGroups).values(opts.input).returning();
      return result[0];
    }),
  }),
  update: router({
    one: publicProcedure.input(insertSchema.required()).mutation(async (opts) => {
      const result = await db.update(siteGroups).set(opts.input).where(eq(siteGroups.id, opts.input.id)).returning();
      return result[0];
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db.delete(siteGroups).where(eq(siteGroups.id, opts.input)).returning();
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db.delete(siteGroups).where(inArray(siteGroups.id, opts.input));
      return result;
    }),
  }),
});