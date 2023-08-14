import { sites, comments } from 'db/entities';
import { db } from 'utils/db';
import { SitesInsertInterface, SitesInterface, createSiteZodSchema } from './schemas';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export async function getSiteById(data: SitesInterface) {
  const result = await db
    .select()
    .from(sites)
    .leftJoin(comments, eq(sites.commentID, comments.id))
    .where(eq(sites.id, data.id));
  return result[0];
}

export async function selectAll() {
  const result = await db.select().from(sites).leftJoin(comments, eq(sites.commentID, comments.id));

  return result;
}

export async function insertOneSite(data: z.infer<typeof createSiteZodSchema>) {
  const result = await db.transaction(async (tx) => {
    const result2 = await tx.insert(comments).values({ content: data.comment }).returning();
    const result1 = await tx
      .insert(sites)
      .values({ ...data, commentID: result2[0].id })
      .returning();

    return { sites: result1[0], comments: result2[0] };
  });

  return result;
}

export async function putSite(data: SitesInterface) {
  const result = await db.update(sites).set(data).where(eq(sites.id, data.id)).returning();
  return result[0];
}

export async function deleteSite(data: SitesInterface) {
  const result = await db.delete(sites).where(eq(sites.id, data.id)).returning();
  return result[0];
}
