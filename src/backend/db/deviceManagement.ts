import { relations, sql } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  serial,
  integer,
  uuid,
  foreignKey,
  json,
} from 'drizzle-orm/pg-core';
import { sites, racks } from './entities';

export const devices = pgTable(
  'devices',
  {
    id: uuid('id').notNull().defaultRandom(),
    name: text('name').notNull(),
    siteId: integer('site_id')
      .notNull()
      .references(() => sites.id),
    rackId: uuid('rack_id').references(() => racks.id),
    comment: text('comment'),
    qrCodeId: uuid('qr_code_id'), //Reference defined inside deviceToQrCodeRelations
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (devices) => {
    return {
      cpk: primaryKey(devices.id),
      nameIndex: uniqueIndex('devices_name_index').on(devices.name),
    };
  }
);

export const qrCodes = pgTable(
  'qr_codes',
  {
    id: serial('id').notNull(),
    deviceId: uuid('device_id'),
    value: text('value').notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (qrCodes) => {
    return {
      cpk: primaryKey(qrCodes.id),
      idIndex: uniqueIndex('qr_codes_id_index').on(qrCodes.id),
    };
  }
);

export const deviceToQrCodeRelations = relations(qrCodes, ({ one }) => ({
  uniqueQrCode: one(devices, {
    fields: [qrCodes.deviceId],
    references: [devices.id],
  }),
}));

export const deviceTemplates = pgTable(
  'device_templates',
  {
    id: serial('id'),
    name: text('name').notNull(),
    template: json('template'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (deviceTypes) => {
    return {
      cpk: primaryKey(deviceTypes.id),
      idIndex: uniqueIndex('device_types_id_index').on(deviceTypes.id),
      nameIndex: uniqueIndex('device_types_name_index').on(deviceTypes.name),
    };
  }
);

export const interfaces = pgTable(
  'interfaces',
  {
    id: uuid('id').notNull().defaultRandom(),
    name: text('name').notNull(),
    label: text('label'),
    deviceId: uuid('device_id')
      .notNull()
      .references(() => devices.id),
    bridgeId: uuid('bridge_id').unique(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (interfaces) => {
    return {
      cpk: primaryKey(interfaces.id),
      reference: foreignKey({
        columns: [interfaces.bridgeId],
        foreignColumns: [interfaces.id],
      }),
    };
  }
);
