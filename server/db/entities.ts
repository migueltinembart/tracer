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

export const status_enum = pgEnum("status_enum", [
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
    tenant_group_id: integer("tenant_group_id")
      .default(sql`null`)
      .references(() => tenant_groups.id, { onDelete: "set null" }),
    description: text("description").notNull().default(""),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (tenants) => {
    return {
      cpk: primaryKey(tenants.id),
      id_index: uniqueIndex("tenants_id_index").on(tenants.id),
    };
  }
);

export const tenant_groups = pgTable(
  "tenant_groups",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (tenant_groups) => {
    return {
      cpk: primaryKey(tenant_groups.id),
      id_index: uniqueIndex("site_groups_id_index").on(tenant_groups.id),
    };
  }
);

export const sites = pgTable(
  "sites",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    status: status_enum("status").notNull(),
    description: text("description").notNull().default(""),
    site_group_id: integer("site_group_id")
      .default(sql`null`)
      .references(() => site_groups.id, { onDelete: "set null" }),
    tenant_id: integer("tenant_id").references(() => tenants.id, {
      onDelete: "set null",
    }),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (sites) => {
    return {
      cpk: primaryKey(sites.id),
      id_index: uniqueIndex("sites_id_index").on(sites.id),
    };
  }
);

export const site_groups = pgTable(
  "site_groups",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (site_groups) => {
    return {
      cpk: primaryKey(site_groups.id),
      id_index: uniqueIndex("site_groups_id_index").on(site_groups.id),
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
    contact_group_id: integer("contact_group_id")
      .default(sql`null`)
      .references(() => contact_groups.id, { onDelete: "set null" }),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (contacts) => {
    return {
      cpk: primaryKey(contacts.id),
      id_index: uniqueIndex("contacts_id_index").on(contacts.id),
    };
  }
);

export const contact_groups = pgTable(
  "contact_groups",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (contact_groups) => {
    return {
      cpk: primaryKey(contact_groups.id),
      id_index: uniqueIndex("contact_groups_id_index").on(contact_groups.id),
    };
  }
);

export const locations = pgTable(
  "locations",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    site_id: integer("site_id")
      .notNull()
      .default(sql`null`)
      .references(() => sites.id, { onDelete: "set null" }),
    status: status_enum("status").notNull(),
    description: text("description").notNull().default(""),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (locations) => {
    return {
      cpk: primaryKey(locations.id),
      id_index: uniqueIndex("locations_id_index").on(locations.id),
    };
  }
);

export const rack_roles = pgTable(
  "rack_roles",
  {
    id: serial("id").notNull(),
    name: text("name").notNull().unique(),
    color_name: text("color_name"),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (rack_roles) => {
    return {
      cpk: primaryKey(rack_roles.id),
      name_index: uniqueIndex("rack_roles_name_index").on(rack_roles.name),
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
    location_id: integer("location_id")
      .notNull()
      .references(() => locations.id, { onDelete: "set null" }),
    roleId: integer("role_id").references(() => rack_roles.id),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (racks) => {
    return {
      cpk: primaryKey(racks.id),
      name_index: uniqueIndex("racks_name_index").on(racks.name),
    };
  }
);
