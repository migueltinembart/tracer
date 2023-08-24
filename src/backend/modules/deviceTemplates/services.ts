import { deviceTemplates } from '@backend/db/deviceManagement';
import { db } from '@backend/utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectDeviceTemplatesInterface, InsertDeviceTemplatesInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(deviceTemplates)
    .where(data.offset ? sql`${deviceTemplates.id} > ${data.offset}` : sql`${deviceTemplates.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? deviceTemplates[data.sort_by] : deviceTemplates.id)
        : desc(data.sort_by ? deviceTemplates[data.sort_by] : deviceTemplates.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectDeviceTemplateById(data: SelectDeviceTemplatesInterface) {
  const result = await db.select().from(deviceTemplates).where(eq(deviceTemplates.id, data.id));

  return result[0];
}

export async function insertOneDeviceTemplate(data: InsertDeviceTemplatesInterface) {
  const result = await db.insert(deviceTemplates).values(data).returning();

  return result[0];
}

export async function updateDeviceTemplates(data: SelectDeviceTemplatesInterface[]) {
  const result = data.map(async (deviceTemplate) => {
    return await db
      .update(deviceTemplates)
      .set({ ...deviceTemplate, updatedAt: sql`NOW()` })
      .where(eq(deviceTemplates.id, deviceTemplate.id))
      .returning();
  });

  return result[0];
}

export async function updateDeviceTemplate(data: SelectDeviceTemplatesInterface) {
  const result = await db.update(deviceTemplates).set(data).where(eq(deviceTemplates.id, data.id)).returning();
  return result[0];
}

export async function deleteDeviceTemplate(data: SelectDeviceTemplatesInterface) {
  const result = await db.delete(deviceTemplates).where(eq(deviceTemplates.id, data.id)).returning();
  return result[0];
}
