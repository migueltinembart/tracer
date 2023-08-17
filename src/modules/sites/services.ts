import { sites } from 'db/entities';
import { db } from 'utils/db';
import { eq, sql } from 'drizzle-orm';
import { SelectSitesInterface, InsertSitesInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(sites)
    .limit(data?.limit || 25);

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
