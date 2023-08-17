import { siteGroups } from 'db/entities';
import { db } from 'utils/db';
import { eq, sql } from 'drizzle-orm';
import { SelectSiteGroupsInterface, InsertSiteGroupsInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(siteGroups)
    .limit(data?.limit || 25);

  return result;
}

export async function SelectSiteGroupById(data: SelectSiteGroupsInterface) {
  const result = await db.select().from(siteGroups).where(eq(siteGroups.id, data.id));

  return result[0];
}

export async function insertOneSiteGroup(data: SelectSiteGroupsInterface) {
  const result = await db.insert(siteGroups).values(data).returning();
  return result[0];
}

export async function updateSiteGroups(data: SelectSiteGroupsInterface[]) {
  const result = data.map(async (siteGroup) => {
    return await db
      .update(siteGroups)
      .set({ ...siteGroup, updatedAt: sql`NOW()` })
      .where(eq(siteGroups.id, siteGroup.id))
      .returning();
  });

  return result[0];
}

export async function updateSiteGroup(data: SelectSiteGroupsInterface) {
  const result = await db.update(siteGroups).set(data).where(eq(siteGroups.id, data.id)).returning();
  return result[0];
}

export async function deleteSiteGroup(data: SelectSiteGroupsInterface) {
  const result = await db.delete(siteGroups).where(eq(siteGroups.id, data.id)).returning();
  return result[0];
}
