import { tenantGroups } from '@backend/db/entities';
import { db } from '@backend/utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectTenantGroupsInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(tenantGroups)
    .where(data.offset ? sql`${tenantGroups.id} > ${data.offset}` : sql`${tenantGroups.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? tenantGroups[data.sort_by] : tenantGroups.id)
        : desc(data.sort_by ? tenantGroups[data.sort_by] : tenantGroups.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectTenantGroupById(data: SelectTenantGroupsInterface) {
  const result = await db.select().from(tenantGroups).where(eq(tenantGroups.id, data.id));

  return result[0];
}

export async function insertOneTenantGroup(data: SelectTenantGroupsInterface) {
  const result = await db.insert(tenantGroups).values(data).returning();
  return result[0];
}

export async function updateTenantGroups(data: SelectTenantGroupsInterface[]) {
  const result = data.map(async (tenantGroup) => {
    return await db
      .update(tenantGroups)
      .set({ ...tenantGroup, updatedAt: sql`NOW()` })
      .where(eq(tenantGroups.id, tenantGroup.id))
      .returning();
  });

  return result[0];
}

export async function updateTenantGroup(data: SelectTenantGroupsInterface) {
  const result = await db.update(tenantGroups).set(data).where(eq(tenantGroups.id, data.id)).returning();
  return result[0];
}

export async function deleteTenantGroup(data: SelectTenantGroupsInterface) {
  const result = await db.delete(tenantGroups).where(eq(tenantGroups.id, data.id)).returning();
  return result[0];
}
