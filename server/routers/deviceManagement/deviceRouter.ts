import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { devices, qrCodes } from "@/server/db/deviceManagement";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { racks } from "@/server/db/entities";

const insertSchema = createInsertSchema(devices);
const updateSchema = createSelectSchema(devices)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const devicesRouter = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: devices.id,
          name: devices.name,
          comment: devices.description,
          qr: qrCodes,
          rack: racks,
          createdAt: devices.createdAt,
          updatedAt: devices.updatedAt,
        })
        .from(devices)
        .leftJoin(qrCodes, eq(devices.qrCodeId, qrCodes.id))
        .leftJoin(racks, eq(devices.rackId, racks.id));
      return result;
    }),
    one: privateProcedure.input(z.string().uuid()).query(async (opts) => {
      const result = await db
        .select({
          id: devices.id,
          name: devices.name,
          comment: devices.description,
          createdAt: devices.createdAt,
          updatedAt: devices.updatedAt,
        })
        .from(devices)
        .where(eq(devices.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(devices).values(opts.input).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db.insert(devices).values(opts.input).returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(devices)
        .set({ ...opts.input, updatedAt })
        .where(eq(devices.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.string().uuid()).mutation(async (opts) => {
      const result = await db.delete(devices).where(eq(devices.id, opts.input));
      return result;
    }),
    many: privateProcedure
      .input(z.array(z.string().uuid()))
      .mutation(async (opts) => {
        const result = await db
          .delete(devices)
          .where(inArray(devices.id, opts.input));
        return result;
      }),
  }),
});
