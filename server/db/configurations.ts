import { pgTable, primaryKey, text, uniqueIndex } from "drizzle-orm/pg-core";

export const colors = pgTable(
  "colors",
  {
    name: text("name").notNull().unique(),
    value: text("value").notNull(),
  },
  (colors) => {
    return {
      cpk: primaryKey(colors.name),
      nameIndex: uniqueIndex("colors_name_index").on(colors.name),
    };
  }
);
