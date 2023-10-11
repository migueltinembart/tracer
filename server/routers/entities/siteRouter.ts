import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { site_groups, sites, tenants } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(sites);
const updateSchema = createSelectSchema(sites)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });

const updated_at = sql`now()`;

export const sites_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          site_group: site_groups,
          tenant: tenants,
          created_at: sites.created_at,
          updated_at: sites.updated_at,
        })
        .from(sites)
        .leftJoin(site_groups, eq(sites.site_group_id, site_groups.id))
        .leftJoin(tenants, eq(sites.tenant_id, tenants.id));
      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: sites.id,
          name: sites.name,
          status: sites.status,
          site_group: site_groups,
          tenant: tenants,
          created_at: sites.created_at,
          updated_at: sites.updated_at,
        })
        .from(sites)
        .leftJoin(site_groups, eq(sites.site_group_id, site_groups.id))
        .leftJoin(tenants, eq(sites.tenant_id, tenants.id))
        .where(eq(sites.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(sites).values(opts.input).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db.insert(sites).values(opts.input).returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(sites)
        .set({ ...opts.input, updated_at })
        .where(eq(sites.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.number()).mutation(async (opts) => {
      const result = await db.delete(sites).where(eq(sites.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(sites)
        .where(inArray(sites.id, opts.input));
      return result;
    }),
  }),
});
