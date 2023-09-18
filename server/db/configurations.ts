import { sql } from 'drizzle-orm';
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
} from 'drizzle-orm/pg-core';

export const colors = pgTable(
  'colors',
  {
    name: text('name').notNull().unique(),
    value: text('value').notNull(),
  },
  (colors) => {
    return {
      cpk: primaryKey(colors.name),
      nameIndex: uniqueIndex('racks_name_index').on(colors.name),
    };
  }
);
