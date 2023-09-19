import { publicProcedure, router } from 'utils/trpc/trpc';
import { db } from 'utils/db';
import { contacts, contactGroups } from 'db/entities';
import { z } from 'zod';
import { eq, inArray, sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

const insertSchema = createInsertSchema(contacts);
const updateSchema = createSelectSchema(contacts)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .required({ id: true });
const updatedAt = sql`now()`;

export const contactsRouter = router({
  select: router({
    all: publicProcedure.query(async () => {
      const result = await db
        .select({
          id: contacts.id,
          name: contacts.name,
          phone: contacts.phone,
          email: contacts.email,
          address: contacts.adress,
          contactGroup: contactGroups,
          description: contacts.description,
          title: contacts.title,
          createdAt: contacts.createdAt,
          updatedAt: contacts.updatedAt,
        })
        .from(contacts)
        .leftJoin(contactGroups, eq(contacts.contactGroupId, contactGroups.id));
      return result;
    }),
    one: publicProcedure.input(z.number()).query(async (opts) => {
      const result = await db
        .select({
          id: contacts.id,
          name: contacts.name,
          phone: contacts.phone,
          email: contacts.email,
          address: contacts.adress,
          contactGroup: contactGroups,
          description: contacts.description,
          title: contacts.title,
          createdAt: contacts.createdAt,
          updatedAt: contacts.updatedAt,
        })
        .from(contacts)
        .where(eq(contacts.id, opts.input));
      return result[0];
    }),
  }),
  create: router({
    one: publicProcedure.input(insertSchema).mutation(async (opts) => {
      const result = await db.insert(contacts).values(opts.input).returning();
      return result[0];
    }),
    many: publicProcedure.input(z.array(insertSchema)).mutation(async (opts) => {
      const result = await db.insert(contacts).values(opts.input).returning();
      return result;
    }),
  }),
  update: router({
    one: publicProcedure.input(updateSchema).mutation(async (opts) => {
      const result = await db
        .update(contacts)
        .set({ ...opts.input, updatedAt })
        .where(eq(contacts.id, opts.input.id))
        .returning();
      return result[0];
    }),
  }),
  delete: router({
    one: publicProcedure.input(z.number()).mutation(async (opts) => {
      const result = await db.delete(contacts).where(eq(contacts.id, opts.input));
      return result;
    }),
    many: publicProcedure.input(z.array(z.number())).mutation(async (opts) => {
      const result = await db.delete(contacts).where(inArray(contacts.id, opts.input));
      return result;
    }),
  }),
});
