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

export const ipAdressRangeRolesEnum = pgEnum("ip_adress_range_enum", [
  "dhcp",
  "reserved",
  "active",
  "inactive",
]);

// single ip adresses only
export const ipAdresses = pgTable(
  "ip_adresses",
  {
    id: uuid("id").notNull(),
    adress: text("adress").notNull(),
    deviceId: uuid("device_id").references(() => devices.id),
    dnsName: text("dns_name"),
    description: text("description"),
    tenantId: integer("tenant_id").references(() => tenants.id),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (ipAdresses) => {
    return {
      cpk: primaryKey(ipAdresses.id),
    };
  }
);

// ranges of ip ad
export const ipAdressRanges = pgTable(
  "ip_adress_ranges",
  {
    id: serial("id").notNull(),
    name: text("name"),
    description: text("description"),
    startadress: text("start_adress").notNull(),
    endadress: text("end_adress").notNull(),
    status: ipAdressRangeRolesEnum("status"),
    roleId: integer("role_id").references(() => networkRoles.id),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (adressRanges) => {
    return {
      cpk: primaryKey(adressRanges.id),
      nameIndex: uniqueIndex("ip_adress_ranges_name_index").on(
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
    roleId: integer("role_id").references(() => networkRoles.id),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (subnets) => {
    return {
      cpk: primaryKey(subnets.id),
      prefixIndex: uniqueIndex("subnets_prefix_index").on(subnets.prefix),
    };
  }
);

export const vlans = pgTable(
  "vlans",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    vlanId: integer("vlan_id").notNull(),
    siteId: integer("site_id").references(() => sites.id),
    roleId: integer("role_id").references(() => networkRoles.id),
    subnetId: integer("subnet_id").references(() => subnets.id),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (vlans) => {
    return {
      cpk: primaryKey(vlans.id),
      nameIndex: uniqueIndex("vlans_name_index").on(vlans.name),
    };
  }
);

export const networkRoles = pgTable(
  "network_roles",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (roles) => {
    return {
      cpk: primaryKey(roles.id),
      nameIndex: uniqueIndex("network_roles_name_index").on(roles.name),
    };
  }
);
