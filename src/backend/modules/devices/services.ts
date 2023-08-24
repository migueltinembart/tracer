import { devices } from 'db/deviceManagement';
import { db } from 'utils/db';
import { eq, sql, asc, desc } from 'drizzle-orm';
import { SelectDevicesInterface, InsertDevicesInterface, AllowedQueryStrings } from './schemas';

export async function selectAll(data: AllowedQueryStrings) {
  const result = await db
    .select()
    .from(devices)
    .where(data.offset ? sql`${devices.id} > ${data.offset}` : sql`${devices.id} > 0`)
    .orderBy(
      data.sort_order == 'asc'
        ? asc(data.sort_by ? devices[data.sort_by] : devices.id)
        : desc(data.sort_by ? devices[data.sort_by] : devices.id)
    )
    .limit(data.limit!);
  return result;
}

export async function SelectDeviceById(data: SelectDevicesInterface) {
  const result = await db.select().from(devices).where(eq(devices.id, data.id));

  return result[0];
}

export async function insertOneDevice(data: InsertDevicesInterface) {
  const result = await db.insert(devices).values(data).returning();

  return result[0];
}

export async function updateDevices(data: SelectDevicesInterface[]) {
  const result = data.map(async (device) => {
    return await db
      .update(devices)
      .set({ ...device, updatedAt: sql`NOW()` })
      .where(eq(devices.id, device.id))
      .returning();
  });

  return result[0];
}

export async function updateDevice(data: SelectDevicesInterface) {
  const result = await db.update(devices).set(data).where(eq(devices.id, data.id)).returning();
  return result[0];
}

export async function deleteDevice(data: SelectDevicesInterface) {
  const result = await db.delete(devices).where(eq(devices.id, data.id)).returning();
  return result[0];
}
