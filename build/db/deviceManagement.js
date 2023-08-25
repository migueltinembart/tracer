"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interfaces = exports.deviceTemplates = exports.deviceToQrCodeRelations = exports.qrCodes = exports.devices = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const entities_1 = require("./entities");
exports.devices = (0, pg_core_1.pgTable)('devices', {
    id: (0, pg_core_1.uuid)('id').notNull().defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
    siteId: (0, pg_core_1.integer)('site_id')
        .notNull()
        .references(() => entities_1.sites.id),
    rackId: (0, pg_core_1.uuid)('rack_id').references(() => entities_1.racks.id),
    comment: (0, pg_core_1.text)('comment'),
    qrCodeId: (0, pg_core_1.uuid)('qr_code_id'),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (devices) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(devices.id),
        nameIndex: (0, pg_core_1.uniqueIndex)('devices_name_index').on(devices.name),
    };
});
exports.qrCodes = (0, pg_core_1.pgTable)('qr_codes', {
    id: (0, pg_core_1.serial)('id').notNull(),
    deviceId: (0, pg_core_1.uuid)('device_id'),
    value: (0, pg_core_1.text)('value').notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (qrCodes) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(qrCodes.id),
        idIndex: (0, pg_core_1.uniqueIndex)('qr_codes_id_index').on(qrCodes.id),
    };
});
exports.deviceToQrCodeRelations = (0, drizzle_orm_1.relations)(exports.qrCodes, ({ one }) => ({
    uniqueQrCode: one(exports.devices, {
        fields: [exports.qrCodes.deviceId],
        references: [exports.devices.id],
    }),
}));
exports.deviceTemplates = (0, pg_core_1.pgTable)('device_templates', {
    id: (0, pg_core_1.serial)('id'),
    name: (0, pg_core_1.text)('name').notNull(),
    template: (0, pg_core_1.json)('template'),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (deviceTypes) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(deviceTypes.id),
        idIndex: (0, pg_core_1.uniqueIndex)('device_types_id_index').on(deviceTypes.id),
        nameIndex: (0, pg_core_1.uniqueIndex)('device_types_name_index').on(deviceTypes.name),
    };
});
exports.interfaces = (0, pg_core_1.pgTable)('interfaces', {
    id: (0, pg_core_1.uuid)('id').notNull().defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
    label: (0, pg_core_1.text)('label'),
    deviceId: (0, pg_core_1.uuid)('device_id')
        .notNull()
        .references(() => exports.devices.id),
    bridgeId: (0, pg_core_1.uuid)('bridge_id').unique(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (interfaces) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(interfaces.id),
        reference: (0, pg_core_1.foreignKey)({
            columns: [interfaces.bridgeId],
            foreignColumns: [interfaces.id],
        }),
    };
});
