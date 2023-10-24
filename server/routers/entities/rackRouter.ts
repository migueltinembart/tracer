import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { locations, sites, racks, tenants } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@/server/db/auth";

const insertSchema = createInsertSchema(racks);
const updateSchema = createSelectSchema(racks)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const racks_router = router({
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
          updated_at: racks.updated_at,
          created_at: racks.created_at,
          created_by: users,
          updated_by: users
        })
        .from(racks)
        .leftJoin(users, eq(racks.created_by, users.id))
        .leftJoin(locations, eq(racks.location_id, locations.id))
        .leftJoin(sites, eq(locations.site_id, sites.id))
        .leftJoin(tenants, eq(sites.tenant_id, tenants.id));

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
          updated_at: racks.updated_at,
          created_at: racks.created_at,
          created_by: users,
          updated_by: users
        })
        .from(racks)
        .leftJoin(users, eq(racks.created_by, users.id))
        .leftJoin(locations, eq(racks.location_id, locations.id))
        .leftJoin(sites, eq(locations.site_id, sites.id))
        .leftJoin(tenants, eq(sites.tenant_id, tenants.id))
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
        .set({ ...opts.input, updated_at })
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
