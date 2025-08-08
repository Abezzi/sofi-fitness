import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categoryTable = sqliteTable("category_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
