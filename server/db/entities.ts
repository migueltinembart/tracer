import { sql } from "drizzle-orm";
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
  numeric,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status_enum", [
  "active",
  "planned",
  "staging",
  "retired",
]);

export const tenants = pgTable(
  "tenants",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    tenantGroupId: integer("tenant_group_id")
      .default(sql`null`)
      .references(() => tenantGroups.id, { onDelete: "set null" }),
    description: text("description").notNull().default(""),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (tenants) => {
    return {
      cpk: primaryKey(tenants.id),
      idIndex: uniqueIndex("tenants_id_index").on(tenants.id),
    };
  }
);

export const tenantGroups = pgTable(
  "tenant_groups",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (tenantGroups) => {
    return {
      cpk: primaryKey(tenantGroups.id),
      idIndex: uniqueIndex("site_groups_id_index").on(tenantGroups.id),
    };
  }
);

export const sites = pgTable(
  "sites",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    status: statusEnum("status").notNull(),
    description: text("description").notNull().default(""),
    siteGroupId: integer("site_group_id")
      .default(sql`null`)
      .references(() => siteGroups.id, { onDelete: "set null" }),
    tenantId: integer("tenant_id").references(() => tenants.id, {
      onDelete: "set null",
    }),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (sites) => {
    return {
      cpk: primaryKey(sites.id),
      idIndex: uniqueIndex("sites_id_index").on(sites.id),
    };
  }
);

export const siteGroups = pgTable(
  "site_groups",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (siteGroups) => {
    return {
      cpk: primaryKey(siteGroups.id),
      idIndex: uniqueIndex("site_groups_id_index").on(siteGroups.id),
    };
  }
);

export const contacts = pgTable(
  "contacts",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    title: text("title"),
    phone: text("phone"),
    email: text("email").unique(),
    adress: text("adress"),
    description: text("description").notNull().default(""),
    contactGroupId: integer("contact_group_id")
      .default(sql`null`)
      .references(() => contactGroups.id, { onDelete: "set null" }),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (contacts) => {
    return {
      cpk: primaryKey(contacts.id),
      idIndex: uniqueIndex("contacts_id_index").on(contacts.id),
    };
  }
);

export const contactGroups = pgTable(
  "contact_groups",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (contactGroups) => {
    return {
      cpk: primaryKey(contactGroups.id),
      idIndex: uniqueIndex("contact_groups_id_index").on(contactGroups.id),
    };
  }
);

export const locations = pgTable(
  "locations",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    siteId: integer("site_id")
      .notNull()
      .default(sql`null`)
      .references(() => sites.id, { onDelete: "set null" }),
    status: statusEnum("status").notNull(),
    description: text("description").notNull().default(""),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (locations) => {
    return {
      cpk: primaryKey(locations.id),
      idIndex: uniqueIndex("locations_id_index").on(locations.id),
    };
  }
);

export const rackRoles = pgTable(
  "rack_roles",
  {
    id: serial("id").notNull(),
    name: text("name").notNull().unique(),
    colorName: text("color_name"),
    description: text("description"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (rackRoles) => {
    return {
      cpk: primaryKey(rackRoles.id),
      nameIndex: uniqueIndex("rack_roles_name_index").on(rackRoles.name),
    };
  }
);

export const racks = pgTable(
  "racks",
  {
    id: uuid("id").notNull().defaultRandom(),
    name: text("name").notNull(),
    units: numeric("units").notNull(),
    description: text("description"),
    locationId: integer("location_id")
      .notNull()
      .references(() => locations.id, { onDelete: "set null" }),
    roleId: integer("role_id").references(() => rackRoles.id),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (racks) => {
    return {
      cpk: primaryKey(racks.id),
      nameIndex: uniqueIndex("racks_name_index").on(racks.name),
    };
  }
);
