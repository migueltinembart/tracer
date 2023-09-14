import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { locations, sites } from 'db/entities';
import { z } from 'zod';
import { eq, inArray, sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(locations);
const updateSchema = createSelectSchema(locations)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const locationsRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db
        .select({
          id: locations.id,
          name: locations.name,
          site: sites,
          comment: locations.comment,
          updatedAt: locations.updatedAt,
          createdAt: locations.createdAt,
        })
        .from(locations)
        .leftJoin(sites, eq(locations.siteId, sites.id));

      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: locations.id,
          name: locations.name,
          site: sites,
          comment: locations.comment,
          updatedAt: locations.updatedAt,
          createdAt: locations.createdAt,
        })
        .from(locations)
        .leftJoin(sites, eq(locations.siteId, sites.id))
        .where(eq(locations.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(locations).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(locations).values(opts.input).returning();
      return result;
    }),
  }),
  update: router({
    one: publicProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(locations)
        .set({ ...opts.input, updatedAt })
        .where(eq(locations.id, opts.input.id))
        .returning();
      return result;
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db.delete(locations).where(eq(locations.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db.delete(locations).where(inArray(locations.id, opts.input));
      return result;
    }),
  }),
});
