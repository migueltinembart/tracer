import { tenants } from '@backend/db/entities';
import { db } from '@backend/utils/db';
import { eq, sql, desc, asc } from 'drizzle-orm';
import { SelectTenantsInterface, InsertTenantsInterface } from './schemas';
import { AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(tenants)
    .where(data.offset ? sql`${tenants.id} > ${data.offset}` : sql`${tenants.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? tenants[data.sort_by] : tenants.id)
        : desc(data.sort_by ? tenants[data.sort_by] : tenants.id)
    )
    .limit(data.limit!);

  return result;
}

export async function SelectTenantById(data: SelectTenantsInterface) {
  const result = await db.select().from(tenants).where(eq(tenants.id, data.id));

  return result[0];
}

export async function insertOneTenant(data: InsertTenantsInterface) {
  const result = await db.insert(tenants).values(data).returning();
  return result[0];
}

export async function updateTenants(data: SelectTenantsInterface[]) {
  const result = data.map(async (tenant) => {
    return await db
      .update(tenants)
      .set({ ...tenant, updatedAt: sql`NOW()` })
      .where(eq(tenants.id, tenant.id))
      .returning();
  });

  return result[0];
}

export async function updateTenant(data: SelectTenantsInterface) {
  const result = await db.update(tenants).set(data).where(eq(tenants.id, data.id)).returning();
  return result[0];
}

export async function deleteTenant(data: SelectTenantsInterface) {
  const result = await db.delete(tenants).where(eq(tenants.id, data.id)).returning();
  return result[0];
}
