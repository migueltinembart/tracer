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
} from "drizzle-orm/pg-core";
import { devices } from "./deviceManagement";
import { sites, tenants } from "./entities";
import { users } from "./auth";

export const ip_adress_range_roles_enum = pgEnum("ip_adress_range_enum", [
  "dhcp",
  "reserved",
  "active",
  "inactive",
]);

// single ip adresses only
export const ip_adresses = pgTable(
  "ip_adresses",
  {
    id: uuid("id").notNull(),
    adress: text("adress").notNull(),
    device_id: uuid("device_id").references(() => devices.id),
    dns_name: text("dns_name"),
    description: text("description"),
    tenant_id: integer("tenant_id").references(() => tenants.id),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").references(() => users.id),
    updated_by: text("updated_by").references(() => users.id)
  },
  (ip_adresses) => {
    return {
      cpk: primaryKey(ip_adresses.id),
    };
  }
);

// ranges of ip ad
export const ip_address_ranges = pgTable(
  "ip_adress_ranges",
  {
    id: serial("id").notNull(),
    name: text("name"),
    description: text("description"),
    start_adress: text("start_adress").notNull(),
    end_adress: text("end_adress").notNull(),
    status: ip_adress_range_roles_enum("status"),
    role_id: integer("role_id").references(() => network_roles.id),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").references(() => users.id),
    updated_by: text("updated_by").references(() => users.id)
  },
  (adressRanges) => {
    return {
      cpk: primaryKey(adressRanges.id),
      name_index: uniqueIndex("ip_adress_ranges_name_index").on(
        adressRanges.name
      ),
    };
  }
);

export const subnets = pgTable(
  "subnets",
  {
    id: serial("id").notNull(),
    prefix: text("prefix").notNull(),
    description: text("description"),
    role_id: integer("role_id").references(() => network_roles.id),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").references(() => users.id),
    updated_by: text("updated_by").references(() => users.id)
  },
  (subnets) => {
    return {
      cpk: primaryKey(subnets.id),
      prefix_index: uniqueIndex("subnets_prefix_index").on(subnets.prefix),
    };
  }
);

export const vlans = pgTable(
  "vlans",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    vlan_id: integer("vlan_id").notNull(), // value of a vlan => vlan id (1 - 65535)
    site_id: integer("site_id").references(() => sites.id),
    role_id: integer("role_id").references(() => network_roles.id),
    subnet_id: integer("subnet_id").references(() => subnets.id),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").references(() => users.id),
    updated_by: text("updated_by").references(() => users.id)
  },
  (vlans) => {
    return {
      cpk: primaryKey(vlans.id),
      name_index: uniqueIndex("vlans_name_index").on(vlans.name),
    };
  }
);

export const network_roles = pgTable(
  "network_roles",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").references(() => users.id),
    updated_by: text("updated_by").references(() => users.id)
  },
  (roles) => {
    return {
      cpk: primaryKey(roles.id),
      name_index: uniqueIndex("network_roles_name_index").on(roles.name),
    };
  }
);
