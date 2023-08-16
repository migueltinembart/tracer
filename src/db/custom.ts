import { primaryKey, text, timestamp, uniqueIndex, uuid, pgTable, varchar } from 'drizzle-orm/pg-core';

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').defaultRandom().notNull(),
    name: varchar("name"),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (tags) => {
    return {
      cpk: primaryKey(tags.id),
      idIndex: uniqueIndex('tags_name_index').on(tags.name),
    };
  }
);
