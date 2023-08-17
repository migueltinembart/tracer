import { sql } from 'drizzle-orm';
import { pgEnum, pgTable, primaryKey, text, timestamp, uniqueIndex, serial, integer } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status_enum', ['active', 'planned', 'staging', 'retired']);

export const sites = pgTable(
  'sites',
  {
    id: serial('id'),
    name: text('name').notNull(),
    status: statusEnum('status').notNull(),
    comment: text('comment').notNull().default(''),
    siteGroupId: integer('site_group_id')
      .default(sql`null`)
      .references(() => siteGroups.id),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (sites) => {
    return {
      cpk: primaryKey(sites.id),
      idIndex: uniqueIndex('sites_id_index').on(sites.id),
    };
  }
);

export const siteGroups = pgTable(
  'site_groups',
  {
    id: serial('id'),
    name: text('name').notNull(),
    comment: text('comment').notNull().default(''),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (siteGroups) => {
    return {
      cpk: primaryKey(siteGroups.id),
      idIndex: uniqueIndex('site_groups_id_index'),
    };
  }
);

export const tenants = pgTable(
  'tenants',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    tenantGroupId: integer('tenant_group_id')
      .default(sql`null`)
      .references(() => tenantGroups.id),
    comment: text('comment').notNull().default(''),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (tenants) => {
    return {
      cpk: primaryKey(tenants.id),
      idIndex: uniqueIndex('tenants_id_index').on(sites.id),
    };
  }
);

export const tenantGroups = pgTable(
  'tenant_groups',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    comment: text('comment').notNull().default(''),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (tenantGroups) => {
    return {
      cpk: primaryKey(tenantGroups.id),
      idIndex: uniqueIndex('site_groups_id_index'),
    };
  }
);

export const contacts = pgTable(
  'contacts',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    title: text('title'),
    phone: text('phone'),
    email: text('email').unique(),
    adress: text('address'),
    comment: text('comment').notNull().default(''),
    contactGroupId: integer('contact_group_id')
      .default(sql`null`)
      .references(() => contactGroups.id),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (contacts) => {
    return {
      cpk: primaryKey(contacts.id),
      idIndex: uniqueIndex('contacts_id_index').on(contacts.id),
    };
  }
);

export const contactGroups = pgTable(
  'contact_groups',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    comment: text('comment').notNull().default(''),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (contactGroups) => {
    return {
      cpk: primaryKey(contactGroups.id),
      idIndex: uniqueIndex('contact_groups_id_index'),
    };
  }
);

export const locations = pgTable(
  'locations',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    siteId: integer('site_id')
      .notNull()
      .default(sql`null`)
      .references(() => sites.id),
    status: statusEnum('status').notNull().default('active'),
    comment: text('comment').notNull().default(''),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (locations) => {
    return {
      cpk: primaryKey(locations.id),
      idIndex: uniqueIndex('locations_id_index'),
    };
  }
);
