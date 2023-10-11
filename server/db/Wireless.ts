import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { vlans } from "./IPAM";
import { site_groups, sites, tenants } from "./entities";
import { users } from "./auth";

export const authTypeEnum = pgEnum("auth_type_enum", [
  "Open",
  "WEP",
  "WPA Personal",
  "WPA Enterprise",
]);
export const authCyperEnum = pgEnum("auth_cypher_enum", ["Auto", "TKIP", "AES"]);

export const wireless_lans = pgTable(
  "wireless_lans",
  {
    id: serial("id").notNull(),
    ssid: text("ssid").notNull(),
    hidden: boolean("hidden"),
    vlan_id: integer("vlan_id").references(() => vlans.id),
    description: text("description"),
    tenant_id: integer("tenant_id").references(() => tenants.id),
    site_id: integer("site_id").references(() => sites.id),
    site_group_id: integer("site_group_id").references(() => site_groups.id),
    wlanGroupId: integer("wireless_lan_group_id").references(
      () => wireless_lan_groups.id
    ),
    authType: authTypeEnum("auth_type_enum").notNull(),
    authCypher: authCyperEnum("auth_cypher_enum").notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").references(() => users.id),
    updated_by: text("updated_by").references(() => users.id)
  },
  (wireless_lans) => {
    return {
      cpk: primaryKey(wireless_lans.id),
      nameIndex: uniqueIndex("wireless_lans_ssid_index").on(wireless_lans.ssid),
    };
  }
);

export const wireless_lan_groups = pgTable(
  "wireless_lan_groups",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").references(() => users.id),
    updated_by: text("updated_by").references(() => users.id)
  },
  (wireless_lan_groups) => {
    return {
      cpk: primaryKey(wireless_lan_groups.id),
      nameIndex: uniqueIndex("wireless_lan_groups_name_index").on(
        wireless_lan_groups.name
      ),
    };
  }
);
