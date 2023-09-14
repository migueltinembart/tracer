import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { devices, interfaces, qrCodes } from 'db/deviceManagement';
import { z } from 'zod';
import { eq, inArray, sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { racks } from '@server/db/entities';
import { alias } from 'drizzle-orm/pg-core';

const insertSchema = createInsertSchema(interfaces);
const updateSchema = createSelectSchema(interfaces)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const interfacesRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const bridgeInterface = alias(interfaces, 'bridgeInterface');
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
    one: publicProcedure.input(z.string().uuid()).query(async (opts) => {
      const bridgeInterface = alias(interfaces, 'bridgeInterface');
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
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(interfaces).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(interfaces).values(opts.input).returning();
      return result;
    }),
  }),
  update: router({
    one: publicProcedure
      .input(updateSchema)
      .mutation(async (opts) => {
        const result = await db
          .update(interfaces)
          .set({ ...opts.input, updatedAt })
          .where(eq(interfaces.id, opts.input.id))
          .returning();
        return result;
      }),
  }),
  delete: router({
    one: publicProcedure.input(z.string().uuid()).mutation(async (opts) => {
      const result = await db.delete(interfaces).where(eq(interfaces.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.string().uuid())).mutation(async (opts) => {
      const result = await db.delete(interfaces).where(inArray(interfaces.id, opts.input));
      return result;
    }),
  }),
});
