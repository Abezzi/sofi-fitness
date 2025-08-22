import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const category = sqliteTable("category", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  color: text(),
});

export type Category = typeof category.$inferSelect;
