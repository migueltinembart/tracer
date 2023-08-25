import { locations } from 'db/entities';
import { db } from 'utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectLocationsInterface, InsertLocationsInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(locations)
    .where(data.offset ? sql`${locations.id} > ${data.offset}` : sql`${locations.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? locations[data.sort_by] : locations.id)
        : desc(data.sort_by ? locations[data.sort_by] : locations.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectLocationById(data: SelectLocationsInterface) {
  const result = await db.select().from(locations).where(eq(locations.id, data.id));

  return result[0];
}

export async function insertOneLocation(data: InsertLocationsInterface) {
  const result = await db.insert(locations).values(data).returning();

  return result[0];
}

export async function updateLocations(data: SelectLocationsInterface[]) {
  const result = data.map(async (location) => {
    return await db
      .update(locations)
      .set({ ...location, updatedAt: sql`NOW()` })
      .where(eq(locations.id, location.id))
      .returning();
  });

  return result[0];
}

export async function updateLocation(data: SelectLocationsInterface) {
  const result = await db.update(locations).set(data).where(eq(locations.id, data.id)).returning();
  return result[0];
}

export async function deleteLocation(data: SelectLocationsInterface) {
  const result = await db.delete(locations).where(eq(locations.id, data.id)).returning();
  return result[0];
}
