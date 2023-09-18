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
} from 'drizzle-orm/pg-core';
import { sites, racks } from './entities';
import { colors } from './configurations';

export const protocolEnum = pgEnum('procotolEnum', ['tpc', 'udp']);

export const devices = pgTable(
  'devices',
  {
    id: uuid('id').notNull().defaultRandom(),
    name: text('name').notNull(),
    siteId: integer('site_id')
      .notNull()
      .references(() => sites.id),
    rackId: uuid('rack_id').references(() => racks.id),
    deviceTypeId: integer('device_type_id')
      .notNull()
      .references(() => deviceTypes.id),
    plattformId: integer('plattform_id').references(() => plattforms.id),
    height: integer('height'),
    frontImage: text('front_image'),
    backImage: text('back_image'),
    position: integer('position'),
    description: text('description'),
    serialNumber: text('serial_number'),
    color: text('color').references(() => colors.name),
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

export const deviceTypes = pgTable(
  'device_types',
  {
    id: serial('id'),
    name: text('name').notNull(),
    description: text('description'),
    manufacturer: integer('manufacturer').references(() => manufacturer.id),
    height: integer('height'),
    frontImage: text('front_image'),
    backImage: text('back_image'),
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

export const deviceRoles = pgTable(
  'device_roles',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    color: text('name')
      .notNull()
      .references(() => colors.name),
    description: text('description'),
  },
  (deviceRoles) => {
    return {
      cpk: primaryKey(deviceRoles.id),
      idIndex: uniqueIndex('device_types_id_index').on(deviceRoles.id),
    };
  }
);

export const manufacturer = pgTable(
  'manufacturer',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
  },
  (manufacturer) => {
    return {
      cpk: primaryKey(manufacturer.id),
      idIndex: uniqueIndex('device_types_id_index').on(manufacturer.id),
    };
  }
);

export const plattforms = pgTable(
  'plattforms',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (plattforms) => {
    return {
      cpk: primaryKey(plattforms.id),
      idIndex: uniqueIndex('device_types_id_index').on(plattforms.id),
      nameIndex: uniqueIndex('device_types_name_index').on(plattforms.name),
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

export const services = pgTable(
  'services',
  {
    id: uuid('id').notNull(),
    name: text('name').notNull(),
    deviceId: uuid('device_id').notNull(),
    protocol: protocolEnum('protocol'),
    port: integer('port'),
    description: text('description'),
  },
  (services) => {
    return {
      cpk: primaryKey(services.id),
      nameIndex: uniqueIndex('devices_name_index').on(services.name),
    };
  }
);
