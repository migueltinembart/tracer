import { tenants } from 'db/entities';
import { db } from 'utils/db';
import { eq, sql } from 'drizzle-orm';
import { SelectTenantsInterface, InsertTenantsInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(tenants)
    .limit(data?.limit || 25);

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
