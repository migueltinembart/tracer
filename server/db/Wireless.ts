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
} from 'drizzle-orm/pg-core';
import { vlans } from './IPAM';
import { siteGroups, sites, tenants } from './entities';

const authTypeEnum = pgEnum('auth_type_enum', ['Open', 'WEP', 'WPA Personal', 'WPA Enterprise']);
const authCyperEnum = pgEnum('auth_cypher_enum', ['Auto', 'TKIP', 'AES']);

export const wirelessLans = pgTable(
  'wireless_lans',
  {
    id: serial('id').notNull(),
    ssid: text('ssid').notNull(),
    hidden: boolean('hidden').notNull(),
    vlanId: integer('vlan_id').references(() => vlans.id),
    description: text('description'),
    tenantId: integer('tenant_id').references(() => tenants.id),
    siteId: integer('site_id').references(() => sites.id),
    siteGroupId: integer('site_group_id').references(() => siteGroups.id),
    wlanGroupId: integer('wireless_lan_group_id').references(() => wirelessLanGroups.id),
    authType: authTypeEnum('auth_type'),
    authCypher: authCyperEnum('auth_cypher'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (wirelessLans) => {
    return {
      cpk: primaryKey(wirelessLans.id),
      nameIndex: uniqueIndex('wireless_lans_ssid_index').on(wirelessLans.ssid),
    };
  }
);

export const wirelessLanGroups = pgTable(
  'wireless_lan_groups',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (wirelessLanGroups) => {
    return {
      cpk: primaryKey(wirelessLanGroups.id),
      nameIndex: uniqueIndex('wireless_lan_groups_name_index').on(wirelessLanGroups.name),
    };
  }
);
