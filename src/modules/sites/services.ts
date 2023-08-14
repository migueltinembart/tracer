import { sites, comments } from 'db/entities';
import { db } from 'utils/db';
import { SitesInsertInterface, SitesInterface } from './schemas';
import { eq } from 'drizzle-orm';

export async function getSiteById(data: SitesInterface) {
  const result = await db
    .select()
    .from(sites)
    .leftJoin(comments, eq(sites.commentID, comments.id))
    .where(eq(sites.id, data.id));
  return result;
}

export async function selectAll() {
  const result = await db.select().from(sites);
  return result;
}

export async function insertOneSite(data: SitesInsertInterface) {
  const result = await db.insert(sites).values(data).returning();
  return result;
}

export async function putSite(data: SitesInterface) {
  const result = await db.update(sites).set(data).where(eq(sites.id, data.id)).returning();
  return result;
}

export async function deleteSite(data: SitesInterface) {
  const result = await db.delete(sites).where(eq(sites.id, data.id)).returning();
  return result;
}
