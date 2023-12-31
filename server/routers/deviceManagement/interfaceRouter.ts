import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { devices, interfaces, qrCodes } from "@/server/db/deviceManagement";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { alias } from "drizzle-orm/pg-core";

const insertSchema = createInsertSchema(interfaces);
const updateSchema = createSelectSchema(interfaces)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const interfacesRouter = router({
  select: router({
    all: privateProcedure.query(async () => {
      const bridgeInterface = alias(interfaces, "bridgeInterface");
      const result = await db
        .select({
          id: interfaces.id,
          name: interfaces.name,
          device: devices,
          bridge: bridgeInterface,
          createdAt: interfaces.createdAt,
          updatedAt: interfaces.updatedAt,
        })
        .from(interfaces)
        .leftJoin(devices, eq(interfaces.deviceId, devices.id))
        .leftJoin(bridgeInterface, eq(interfaces.bridgeId, bridgeInterface.id));

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
          createdAt: interfaces.createdAt,
          updatedAt: interfaces.updatedAt,
        })
        .from(interfaces)
        .leftJoin(devices, eq(interfaces.deviceId, devices.id))
        .leftJoin(bridgeInterface, eq(interfaces.bridgeId, bridgeInterface.id))
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
        .set({ ...opts.input, updatedAt })
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
