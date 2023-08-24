import { racks } from '@backend/db/entities';
import { db } from '@backend/utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectRacksInterface, InsertRacksInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(racks)
    .where(data.offset ? sql`${racks.id} > ${data.offset}` : sql`${racks.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? racks[data.sort_by] : racks.id)
        : desc(data.sort_by ? racks[data.sort_by] : racks.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectRackById(data: SelectRacksInterface) {
  const result = await db.select().from(racks).where(eq(racks.id, data.id));

  return result[0];
}

export async function insertOneRack(data: InsertRacksInterface) {
  const result = await db.insert(racks).values(data).returning();

  return result[0];
}

export async function updateRacks(data: SelectRacksInterface[]) {
  const result = data.map(async (rack) => {
    return await db
      .update(racks)
      .set({ ...rack, updatedAt: sql`NOW()` })
      .where(eq(racks.id, rack.id))
      .returning();
  });

  return result[0];
}

export async function updateRack(data: SelectRacksInterface) {
  const result = await db.update(racks).set(data).where(eq(racks.id, data.id)).returning();
  return result[0];
}

export async function deleteRack(data: SelectRacksInterface) {
  const result = await db.delete(racks).where(eq(racks.id, data.id)).returning();
  return result[0];
}
