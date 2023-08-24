import { qrCodes } from 'db/deviceManagement';
import { db } from 'utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectQrCodesInterface, InsertQrCodesInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(qrCodes)
    .where(data.offset ? sql`${qrCodes.id} > ${data.offset}` : sql`${qrCodes.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? qrCodes[data.sort_by] : qrCodes.id)
        : desc(data.sort_by ? qrCodes[data.sort_by] : qrCodes.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectQrCodeById(data: SelectQrCodesInterface) {
  const result = await db.select().from(qrCodes).where(eq(qrCodes.id, data.id));

  return result[0];
}

export async function insertOneQrCode(data: InsertQrCodesInterface) {
  const result = await db.insert(qrCodes).values(data).returning();

  return result[0];
}

export async function updateQrCodes(data: SelectQrCodesInterface[]) {
  const result = data.map(async (qrCode) => {
    return await db
      .update(qrCodes)
      .set({ ...qrCode, updatedAt: sql`NOW()` })
      .where(eq(qrCodes.id, qrCode.id))
      .returning();
  });

  return result[0];
}

export async function updateQrCode(data: SelectQrCodesInterface) {
  const result = await db.update(qrCodes).set(data).where(eq(qrCodes.id, data.id)).returning();
  return result[0];
}

export async function deleteQrCode(data: SelectQrCodesInterface) {
  const result = await db.delete(qrCodes).where(eq(qrCodes.id, data.id)).returning();
  return result[0];
}
