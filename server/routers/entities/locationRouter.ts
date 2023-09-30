import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { locations, sites } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(locations);
const updateSchema = createSelectSchema(locations)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const locationsRouter = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: locations.id,
          name: locations.name,
          site: sites,
          description: locations.description,
          updatedAt: locations.updatedAt,
          createdAt: locations.createdAt,
        })
        .from(locations)
        .leftJoin(sites, eq(locations.siteId, sites.id));

      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: locations.id,
          name: locations.name,
          site: sites,
          description: locations.description,
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
        .set({ ...opts.input, updatedAt })
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
