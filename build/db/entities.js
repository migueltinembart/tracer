"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.racks = exports.locations = exports.contactGroups = exports.contacts = exports.tenantGroups = exports.tenants = exports.siteGroups = exports.sites = exports.statusEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.statusEnum = (0, pg_core_1.pgEnum)('status_enum', ['active', 'planned', 'staging', 'retired']);
exports.sites = (0, pg_core_1.pgTable)('sites', {
    id: (0, pg_core_1.serial)('id'),
    name: (0, pg_core_1.text)('name').notNull(),
    status: (0, exports.statusEnum)('status').notNull(),
    comment: (0, pg_core_1.text)('comment').notNull().default(''),
    siteGroupId: (0, pg_core_1.integer)('site_group_id')
        .default((0, drizzle_orm_1.sql) `null`)
        .references(() => exports.siteGroups.id, { onDelete: 'set null' }),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (sites) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(sites.id),
        idIndex: (0, pg_core_1.uniqueIndex)('sites_id_index').on(sites.id),
    };
});
exports.siteGroups = (0, pg_core_1.pgTable)('site_groups', {
    id: (0, pg_core_1.serial)('id'),
    name: (0, pg_core_1.text)('name').notNull(),
    comment: (0, pg_core_1.text)('comment').notNull().default(''),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (siteGroups) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(siteGroups.id),
        idIndex: (0, pg_core_1.uniqueIndex)('site_groups_id_index'),
    };
});
exports.tenants = (0, pg_core_1.pgTable)('tenants', {
    id: (0, pg_core_1.serial)('id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    tenantGroupId: (0, pg_core_1.integer)('tenant_group_id')
        .default((0, drizzle_orm_1.sql) `null`)
        .references(() => exports.tenantGroups.id, { onDelete: 'set null' }),
    comment: (0, pg_core_1.text)('comment').notNull().default(''),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (tenants) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(tenants.id),
        idIndex: (0, pg_core_1.uniqueIndex)('tenants_id_index').on(exports.sites.id),
    };
});
exports.tenantGroups = (0, pg_core_1.pgTable)('tenant_groups', {
    id: (0, pg_core_1.serial)('id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    comment: (0, pg_core_1.text)('comment').notNull().default(''),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (tenantGroups) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(tenantGroups.id),
        idIndex: (0, pg_core_1.uniqueIndex)('site_groups_id_index'),
    };
});
exports.contacts = (0, pg_core_1.pgTable)('contacts', {
    id: (0, pg_core_1.serial)('id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    title: (0, pg_core_1.text)('title'),
    phone: (0, pg_core_1.text)('phone'),
    email: (0, pg_core_1.text)('email').unique(),
    adress: (0, pg_core_1.text)('address'),
    comment: (0, pg_core_1.text)('comment').notNull().default(''),
    contactGroupId: (0, pg_core_1.integer)('contact_group_id')
        .default((0, drizzle_orm_1.sql) `null`)
        .references(() => exports.contactGroups.id, { onDelete: 'set null' }),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (contacts) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(contacts.id),
        idIndex: (0, pg_core_1.uniqueIndex)('contacts_id_index').on(contacts.id),
    };
});
exports.contactGroups = (0, pg_core_1.pgTable)('contact_groups', {
    id: (0, pg_core_1.serial)('id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    comment: (0, pg_core_1.text)('comment').notNull().default(''),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (contactGroups) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(contactGroups.id),
        idIndex: (0, pg_core_1.uniqueIndex)('contact_groups_id_index'),
    };
});
exports.locations = (0, pg_core_1.pgTable)('locations', {
    id: (0, pg_core_1.serial)('id').notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    siteId: (0, pg_core_1.integer)('site_id')
        .notNull()
        .default((0, drizzle_orm_1.sql) `null`)
        .references(() => exports.sites.id),
    status: (0, exports.statusEnum)('status').notNull().default('active'),
    comment: (0, pg_core_1.text)('comment').notNull().default(''),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (locations) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(locations.id),
        idIndex: (0, pg_core_1.uniqueIndex)('locations_id_index'),
    };
});
exports.racks = (0, pg_core_1.pgTable)('racks', {
    id: (0, pg_core_1.uuid)('id').notNull().defaultRandom(),
    name: (0, pg_core_1.text)('name').notNull(),
    units: (0, pg_core_1.numeric)('units').notNull(),
    comment: (0, pg_core_1.text)('comment'),
    siteId: (0, pg_core_1.integer)('site_id')
        .notNull()
        .references(() => exports.sites.id),
    tenantId: (0, pg_core_1.integer)('tenant_id')
        .notNull()
        .references(() => exports.tenants.id),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (racks) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(racks.id),
        nameIndex: (0, pg_core_1.uniqueIndex)('racks_name_index').on(racks.name),
    };
});
