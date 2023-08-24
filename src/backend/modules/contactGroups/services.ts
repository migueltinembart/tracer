import { contactGroups } from 'db/entities';
import { db } from 'utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectContactGroupsInterface, InsertContactGroupsInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(contactGroups)
    .where(data.offset ? sql`${contactGroups.id} > ${data.offset}` : sql`${contactGroups.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? contactGroups[data.sort_by] : contactGroups.id)
        : desc(data.sort_by ? contactGroups[data.sort_by] : contactGroups.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectContactGroupById(data: SelectContactGroupsInterface) {
  const result = await db.select().from(contactGroups).where(eq(contactGroups.id, data.id));

  return result[0];
}

export async function insertOneContactGroup(data: InsertContactGroupsInterface) {
  const result = await db.insert(contactGroups).values(data).returning();

  return result[0];
}

export async function updateContactGroups(data: SelectContactGroupsInterface[]) {
  const result = data.map(async (contactGroup) => {
    return await db
      .update(contactGroups)
      .set({ ...contactGroup, updatedAt: sql`NOW()` })
      .where(eq(contactGroups.id, contactGroup.id))
      .returning();
  });

  return result[0];
}

export async function updateContactGroup(data: SelectContactGroupsInterface) {
  const result = await db.update(contactGroups).set(data).where(eq(contactGroups.id, data.id)).returning();
  return result[0];
}

export async function deleteContactGroup(data: SelectContactGroupsInterface) {
  const result = await db.delete(contactGroups).where(eq(contactGroups.id, data.id)).returning();
  return result[0];
}
