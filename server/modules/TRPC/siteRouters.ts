import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { siteGroups, sites } from 'db/entities';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(sites);

export const sitesRouter = router({
  read: router({
    all: publicProcedure.query(async () => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          groupName: siteGroups.name,
          groupId: siteGroups.id,
          createdAt: sites.createdAt,
          updatedAt: sites.updatedAt,
        })
        .from(sites)
        .leftJoin(siteGroups, eq(sites.siteGroupId, siteGroups.id));
      return result;
    }),
    one: publicProcedure.query(async (opts) => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          groupName: siteGroups.name,
          groupId: siteGroups.id,
          createdAt: sites.createdAt,
          updatedAt: sites.updatedAt,
        })
        .from(sites)
        .leftJoin(siteGroups, eq(sites.siteGroupId, siteGroups.id))
        .where(opts.input);
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(sites).values(opts.input).returning();
      return result[0];
    }),
  }),
});
