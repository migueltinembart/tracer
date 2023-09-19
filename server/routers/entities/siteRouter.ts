import { publicProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { siteGroups, sites, tenants } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(sites);
const updateSchema = createSelectSchema(sites)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });

const updatedAt = sql`now()`;

export const sitesRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          siteGroup: siteGroups,
          tenant: tenants,
          createdAt: sites.createdAt,
          updatedAt: sites.updatedAt,
        })
        .from(sites)
        .leftJoin(siteGroups, eq(sites.siteGroupId, siteGroups.id))
        .leftJoin(tenants, eq(sites.tenantId, tenants.id));
      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          siteGroup: siteGroups,
          tenant: tenants,
          createdAt: sites.createdAt,
          updatedAt: sites.updatedAt,
        })
        .from(sites)
        .leftJoin(siteGroups, eq(sites.siteGroupId, siteGroups.id))
        .leftJoin(tenants, eq(sites.tenantId, tenants.id))
        .where(eq(sites.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(sites).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db.insert(sites).values(opts.input).returning();
        return result;
      }),
  }),
  update: router({
    one: publicProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(sites)
        .set({ ...opts.input, updatedAt })
        .where(eq(sites.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.number()).mutation(async (opts) => {
      const result = await db.delete(sites).where(eq(sites.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(sites)
        .where(inArray(sites.id, opts.input));
      return result;
    }),
  }),
});
