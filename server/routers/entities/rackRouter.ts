import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { locations, sites, racks, tenants } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(racks);
const updateSchema = createSelectSchema(racks)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const racksRouter = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: racks.id,
          name: racks.name,
          tenant: tenants,
          location: locations,
          site: sites,
          description: racks.description,
          updatedAt: racks.updatedAt,
          createdAt: racks.createdAt,
        })
        .from(racks)
        .leftJoin(locations, eq(racks.locationId, locations.id))
        .leftJoin(sites, eq(locations.siteId, sites.id))
        .leftJoin(tenants, eq(sites.tenantId, tenants.id));

      return result;
    }),
    one: privateProcedure.input(z.string().uuid()).query(async (opts) => {
      const result = await db
        .select({
          id: racks.id,
          name: racks.name,
          location: locations,
          tenant: tenants,
          site: sites,
          units: racks.units,
          description: racks.description,
          updatedAt: racks.updatedAt,
          createdAt: racks.createdAt,
        })
        .from(racks)
        .leftJoin(locations, eq(racks.locationId, locations.id))
        .leftJoin(sites, eq(locations.siteId, sites.id))
        .leftJoin(tenants, eq(sites.tenantId, tenants.id))
        .where(eq(racks.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(racks).values(opts.input).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db.insert(racks).values(opts.input).returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(racks)
        .set({ ...opts.input, updatedAt })
        .where(eq(racks.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.string().uuid()).mutation(async (opts) => {
      const result = await db.delete(racks).where(eq(racks.id, opts.input));
      return result;
    }),
    many: privateProcedure
      .input(z.array(z.string().uuid()))
      .mutation(async (opts) => {
        const result = await db
          .delete(racks)
          .where(inArray(racks.id, opts.input));
        return result;
      }),
  }),
});
