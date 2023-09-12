import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { siteGroups, sites } from 'db/entities';
import { z } from 'zod';
import { eq, inArray } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(sites);

export const sitesRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          siteGroup: siteGroups,
          createdAt: sites.createdAt,
          updatedAt: sites.updatedAt,
        })
        .from(sites)
        .leftJoin(siteGroups, eq(sites.siteGroupId, siteGroups.id));
      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          siteGroup: siteGroups,
          createdAt: sites.createdAt,
          updatedAt: sites.updatedAt,
        })
        .from(sites)
        .leftJoin(siteGroups, eq(sites.siteGroupId, siteGroups.id))
        .where(eq(sites.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(sites).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(sites).values(opts.input).returning();
      return result;
    }),
  }),
  update: router({
    one: publicProcedure.input(insertSchema.required()).mutation(async (opts) => {
      const result = await db.update(sites).set(opts.input).where(eq(sites.id, opts.input.id)).returning();
      return result[0];
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.number()).mutation(async (opts) => {
      const result = await db.delete(sites).where(eq(sites.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db.delete(sites).where(inArray(sites.id, opts.input));
      return result;
    }),
  }),
});
