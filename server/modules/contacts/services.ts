import { contacts } from 'db/entities';
import { db } from 'utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectContactsInterface, InsertContactsInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(contacts)
    .where(data.offset ? sql`${contacts.id} > ${data.offset}` : sql`${contacts.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? contacts[data.sort_by] : contacts.id)
        : desc(data.sort_by ? contacts[data.sort_by] : contacts.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectContactById(data: SelectContactsInterface) {
  const result = await db.select().from(contacts).where(eq(contacts.id, data.id));

  return result[0];
}

export async function insertOneContact(data: InsertContactsInterface) {
  const result = await db.insert(contacts).values(data).returning();

  return result[0];
}

export async function updateContacts(data: SelectContactsInterface[]) {
  const result = data.map(async (contact) => {
    return await db
      .update(contacts)
      .set({ ...contact, updatedAt: sql`NOW()` })
      .where(eq(contacts.id, contact.id))
      .returning();
  });

  return result[0];
}

export async function updateContact(data: SelectContactsInterface) {
  const result = await db.update(contacts).set(data).where(eq(contacts.id, data.id)).returning();
  return result[0];
}

export async function deleteContact(data: SelectContactsInterface) {
  const result = await db.delete(contacts).where(eq(contacts.id, data.id)).returning();
  return result[0];
}
