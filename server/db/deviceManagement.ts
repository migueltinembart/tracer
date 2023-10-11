import { relations, sql } from "drizzle-orm";
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
  foreignKey,
} from "drizzle-orm/pg-core";
import { sites, racks } from "./entities";
import { colors } from "./configurations";
import { users } from "./auth";

export const protocolEnum = pgEnum("procotolEnum", ["tpc", "udp"]);

export const devices = pgTable(
  "devices",
  {
    id: uuid("id").notNull().defaultRandom(),
    name: text("name").notNull(),
    site_id: integer("site_id")
      .notNull()
      .references(() => sites.id),
    rack_id: uuid("rack_id").references(() => racks.id),
    device_type_id: integer("device_type_id")
      .notNull()
      .references(() => device_types.id),
    plattform_id: integer("plattform_id").references(() => plattforms.id),
    height: integer("height"),
    front_image: text("front_image"),
    back_image: text("back_image"),
    position: integer("position"),
    description: text("description"),
    serial_number: text("serial_number"),
    color: text("color").references(() => colors.name),
    qrCodeId: uuid("qr_code_id"), // Reference defined inside deviceToQrCodeRelations
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (devices) => {
    return {
      cpk: primaryKey(devices.id),
      name_index: uniqueIndex("devices_name_index").on(devices.name),
    };
  }
);

export const devicesToDeviceRoles = pgTable("devicesToDeviceRoles", {
  device_id: uuid("device_id")
    .notNull()
    .references(() => devices.id),
  device_role_id: integer("device_role_id")
    .notNull()
    .references(() => deviceRoles.id),
});

export const device_types = pgTable(
  "device_types",
  {
    id: serial("id"),
    name: text("name").notNull(),
    description: text("description"),
    manufacturer: integer("manufacturer").references(() => manufacturer.id),
    height: integer("height"),
    front_image: text("front_image"),
    back_image: text("back_image"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (device_types) => {
    return {
      cpk: primaryKey(device_types.id),
      id_index: uniqueIndex("device_types_id_index").on(device_types.id),
      name_index: uniqueIndex("device_types_name_index").on(device_types.name),
    };
  }
);

export const deviceRoles = pgTable(
  "device_roles",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    color: text("name")
      .notNull()
      .references(() => colors.name),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (deviceRoles) => {
    return {
      cpk: primaryKey(deviceRoles.id),
      id_index: uniqueIndex("device_roles_id_index").on(deviceRoles.id),
    };
  }
);

export const manufacturer = pgTable(
  "manufacturer",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (manufacturer) => {
    return {
      cpk: primaryKey(manufacturer.id),
      id_index: uniqueIndex("manufacturer_id_index").on(manufacturer.id),
    };
  }
);

export const plattforms = pgTable(
  "plattforms",
  {
    id: serial("id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (plattforms) => {
    return {
      cpk: primaryKey(plattforms.id),
      id_index: uniqueIndex("plattforms_id_index").on(plattforms.id),
    };
  }
);

export const qr_codes = pgTable(
  "qr_codes",
  {
    id: serial("id").notNull(),
    device_id: uuid("device_id"),
    value: text("value").notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (qr_codes) => {
    return {
      cpk: primaryKey(qr_codes.id),
      id_index: uniqueIndex("qr_codes_id_index").on(qr_codes.id),
    };
  }
);

export const deviceToQrCodeRelations = relations(qr_codes, ({ one }) => ({
  uniqueQrCode: one(devices, {
    fields: [qr_codes.device_id],
    references: [devices.id],
  }),
}));

export const interfaces = pgTable(
  "interfaces",
  {
    id: uuid("id").notNull().defaultRandom(),
    name: text("name").notNull(),
    label: text("label"),
    device_id: uuid("device_id")
      .notNull()
      .references(() => devices.id),
    bridge_id: uuid("bridge_id").unique(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (interfaces) => {
    return {
      cpk: primaryKey(interfaces.id),
      reference: foreignKey({
        columns: [interfaces.bridge_id],
        foreignColumns: [interfaces.id],
      }),
    };
  }
);

export const services = pgTable(
  "services",
  {
    id: uuid("id").notNull(),
    name: text("name").notNull(),
    device_id: uuid("device_id").notNull(),
    protocol: protocolEnum("protocol"),
    port: integer("port"),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by: text("created_by").notNull().references(() => users.id),
    updated_by: text("created_by").notNull().references(() => users.id)
  },
  (services) => {
    return {
      cpk: primaryKey(services.id),
      name_index: uniqueIndex("services_name_index").on(services.name),
    };
  }
);
