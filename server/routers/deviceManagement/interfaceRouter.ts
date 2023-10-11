import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { devices, interfaces, qr_codes } from "@/server/db/deviceManagement";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { alias } from "drizzle-orm/pg-core";

const insertSchema = createInsertSchema(interfaces);
const updateSchema = createSelectSchema(interfaces)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const interfaces_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const bridgeInterface = alias(interfaces, "bridgeInterface");
      const result = await db
        .select({
          id: interfaces.id,
          name: interfaces.name,
          device: devices,
          bridge: bridgeInterface,
          created_at: interfaces.created_at,
          updated_at: interfaces.updated_at,
        })
        .from(interfaces)
        .fullJoin(devices, eq(interfaces.device_id, devices.id))
        .leftJoin(bridgeInterface, eq(interfaces.bridge_id, bridgeInterface.id));

      return result;
    }),
    one: privateProcedure.input(z.string().uuid()).query(async (opts) => {
      const bridgeInterface = alias(interfaces, "bridgeInterface");
      const result = await db
        .select({
          id: interfaces.id,
          name: interfaces.name,
          device: devices,
          bridge: bridgeInterface,
          created_at: interfaces.created_at,
          updated_at: interfaces.updated_at,
        })
        .from(interfaces)
        .leftJoin(devices, eq(interfaces.device_id, devices.id))
        .leftJoin(bridgeInterface, eq(interfaces.bridge_id, bridgeInterface.id))
        .where(eq(interfaces.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(interfaces).values(opts.input).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db
          .insert(interfaces)
          .values(opts.input)
          .returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(interfaces)
        .set({ ...opts.input, updated_at })
        .where(eq(interfaces.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.string().uuid()).mutation(async (opts) => {
      const result = await db
        .delete(interfaces)
        .where(eq(interfaces.id, opts.input));
      return result;
    }),
    many: privateProcedure
      .input(z.array(z.string().uuid()))
      .mutation(async (opts) => {
        const result = await db
          .delete(interfaces)
          .where(inArray(interfaces.id, opts.input));
        return result;
      }),
  }),
});
