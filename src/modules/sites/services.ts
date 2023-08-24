import { sites } from '@backend/db/entities';
import { db } from '@backend/utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectSitesInterface, InsertSitesInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(sites)
    .where(data.offset ? sql`${sites.id} > ${data.offset}` : sql`${sites.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? sites[data.sort_by] : sites.id)
        : desc(data.sort_by ? sites[data.sort_by] : sites.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectSiteById(data: SelectSitesInterface) {
  const result = await db.select().from(sites).where(eq(sites.id, data.id));

  return result[0];
}

export async function insertOneSite(data: InsertSitesInterface) {
  const result = await db.insert(sites).values(data).returning();

  return result[0];
}

export async function updateSites(data: SelectSitesInterface[]) {
  const result = data.map(async (site) => {
    return await db
      .update(sites)
      .set({ ...site, updatedAt: sql`NOW()` })
      .where(eq(sites.id, site.id))
      .returning();
  });

  return result[0];
}

export async function updateSite(data: SelectSitesInterface) {
  const result = await db.update(sites).set(data).where(eq(sites.id, data.id)).returning();
  return result[0];
}

export async function deleteSite(data: SelectSitesInterface) {
  const result = await db.delete(sites).where(eq(sites.id, data.id)).returning();
  return result[0];
}
