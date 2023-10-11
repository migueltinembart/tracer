import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { locations, sites } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(locations);
const updateSchema = createSelectSchema(locations)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const locations_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: locations.id,
          name: locations.name,
          site: sites,
          description: locations.description,
          updated_at: locations.updated_at,
          created_at: locations.created_at,
        })
        .from(locations)
        .leftJoin(sites, eq(locations.site_id, sites.id));

      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: locations.id,
          name: locations.name,
          site: sites,
          description: locations.description,
          updated_at: locations.updated_at,
          created_at: locations.created_at,
        })
        .from(locations)
        .leftJoin(sites, eq(locations.site_id, sites.id))
        .where(eq(locations.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(locations).values(opts.input).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db
          .insert(locations)
          .values(opts.input)
          .returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(locations)
        .set({ ...opts.input, updated_at })
        .where(eq(locations.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.coerce.number()).mutation(async (opts) => {
      const result = await db
        .delete(locations)
        .where(eq(locations.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(locations)
        .where(inArray(locations.id, opts.input));
      return result;
    }),
  }),
});
