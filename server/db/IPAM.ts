import { pgEnum, pgTable, primaryKey, text, timestamp, uniqueIndex, serial, integer, uuid } from 'drizzle-orm/pg-core';
import { devices } from './deviceManagement';
import { sites, tenants } from './entities';

export const ipAddressRangeRolesEnum = pgEnum('ip_address_range_enum', ['dhcp', 'reserved', 'active', 'inactive']);

export const ipAdresses = pgTable(
  'ip_adresses',
  {
    id: uuid('id').notNull(),
    address: text('address').notNull(),
    deviceId: uuid('device_id').references(() => devices.id),
    dnsName: text('dns_name'),
    description: text('description'),
    tenantId: integer('tenant_id').references(() => tenants.id),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (ipAdresses) => {
    return {
      cpk: primaryKey(ipAdresses.id),
    };
  }
);

export const ipAdressRanges = pgTable(
  'ip_address_ranges',
  {
    id: serial('id').notNull(),
    name: text('name'),
    description: text('description'),
    startAddress: text('start_address').notNull(),
    endAddress: text('end_address').notNull(),
    status: ipAddressRangeRolesEnum('status'),
    roleId: integer('role_id').references(() => networkRoles.id),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (addressRanges) => {
    return {
      cpk: primaryKey(addressRanges.id),
      nameIndex: uniqueIndex('ip_address_ranges_name_index').on(addressRanges.name),
    };
  }
);

export const subnets = pgTable(
  'subnets',
  {
    id: serial('id').notNull(),
    prefix: text('prefix').notNull(),
    description: text('description'),
    roleId: integer('role_id').references(() => networkRoles.id),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (subnets) => {
    return {
      cpk: primaryKey(subnets.id),
      prefixIndex: uniqueIndex('subnets_prefix_index').on(subnets.prefix),
    };
  }
);

export const vlans = pgTable(
  'vlans',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    vlanId: integer('vlan_id').notNull(),
    siteId: integer('site_id').references(() => sites.id),
    roleId: integer('role_id').references(() => networkRoles.id),
    subnetId: integer('subnet_id').references(() => subnets.id),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (vlans) => {
    return {
      cpk: primaryKey(vlans.id),
      nameIndex: uniqueIndex('vlans_name_index').on(vlans.name),
    };
  }
);

export const networkRoles = pgTable(
  'network_roles',
  {
    id: serial('id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (roles) => {
    return {
      cpk: primaryKey(roles.id),
      nameIndex: uniqueIndex('network_roles_name_index').on(roles.name),
    };
  }
);
