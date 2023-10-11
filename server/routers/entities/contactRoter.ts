import { privateProcedure, router } from "@/server/trpc";
import { db } from "@/server/db";
import { contacts, contact_groups } from "@/server/db/entities";
import { z } from "zod";
import { eq, inArray, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const insertSchema = createInsertSchema(contacts);
const updateSchema = createSelectSchema(contacts)
  .omit({ created_at: true, updated_at: true })
  .partial()
  .required({ id: true });
const updated_at = sql`now()`;

export const contacts_router = router({
  select: router({
    all: privateProcedure.query(async () => {
      const result = await db
        .select({
          id: contacts.id,
          name: contacts.name,
          phone: contacts.phone,
          email: contacts.email,
          address: contacts.adress,
          contactGroup: contact_groups,
          description: contacts.description,
          title: contacts.title,
          created_at: contacts.created_at,
          updated_at: contacts.updated_at,
        })
        .from(contacts)
        .leftJoin(contact_groups, eq(contacts.contact_group_id, contact_groups.id));
      return result;
    }),
    one: privateProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: contacts.id,
          name: contacts.name,
          phone: contacts.phone,
          email: contacts.email,
          address: contacts.adress,
          contactGroup: contact_groups,
          description: contacts.description,
          title: contacts.title,
          created_at: contacts.created_at,
          updated_at: contacts.updated_at,
        })
        .from(contacts)
        .where(eq(contacts.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: privateProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(contacts).values(opts.input).returning();
      return result[0];
    }),
    many: privateProcedure
      .input(z.array(insertSchema))
      .mutation(async (opts) => {
        const result = await db.insert(contacts).values(opts.input).returning();
        return result;
      }),
  }),
  update: router({
    one: privateProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(contacts)
        .set({ ...opts.input, updated_at })
        .where(eq(contacts.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: privateProcedure.input(z.number()).mutation(async (opts) => {
      const result = await db
        .delete(contacts)
        .where(eq(contacts.id, opts.input));
      return result;
    }),
    many: privateProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db
        .delete(contacts)
        .where(inArray(contacts.id, opts.input));
      return result;
    }),
  }),
});
