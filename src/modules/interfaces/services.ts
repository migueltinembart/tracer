import { interfaces } from '@backend/db/deviceManagement';
import { db } from '@backend/utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectInterfacesInterface, InsertInterfacesInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(interfaces)
    .where(data.offset ? sql`${interfaces.id} > ${data.offset}` : sql`${interfaces.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? interfaces[data.sort_by] : interfaces.id)
        : desc(data.sort_by ? interfaces[data.sort_by] : interfaces.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectInterfaceById(data: SelectInterfacesInterface) {
  const result = await db.select().from(interfaces).where(eq(interfaces.id, data.id));

  return result[0];
}

export async function insertOneInterface(data: InsertInterfacesInterface) {
  const result = await db.insert(interfaces).values(data).returning();

  return result[0];
}

export async function updateInterfaces(data: SelectInterfacesInterface[]) {
  const result = data.map(async (ctx) => {
    return await db
      .update(interfaces)
      .set({ ...ctx, updatedAt: sql`NOW()` })
      .where(eq(interfaces.id, ctx.id))
      .returning();
  });

  return result[0];
}

export async function updateInterface(data: SelectInterfacesInterface) {
  const result = await db.update(interfaces).set(data).where(eq(interfaces.id, data.id)).returning();
  return result[0];
}

export async function deleteInterface(data: SelectInterfacesInterface) {
  const result = await db.delete(interfaces).where(eq(interfaces.id, data.id)).returning();
  return result[0];
}
