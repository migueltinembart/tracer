import { siteGroups } from '@backend/db/entities';
import { db } from '@backend/utils/db';
import { eq, sql, asc, desc} from 'drizzle-orm';
import { SelectSiteGroupsInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(siteGroups)
    .where(data.offset ? sql`${siteGroups.id} > ${data.offset}` : sql`${siteGroups.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? siteGroups[data.sort_by] : siteGroups.id)
        : desc(data.sort_by ? siteGroups[data.sort_by] : siteGroups.id)
    )
    .limit(data.limit!);
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
