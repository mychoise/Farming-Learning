import {
  pgTable,
  uuid,
  varchar,
  integer,
  numeric,
  timestamp,
  index,
  text,
} from "drizzle-orm/pg-core";

export const cropCategoryTable = pgTable("crop_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const cropTable = pgTable(
  "crop",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    nepaliName: varchar("nepali_name", { length: 255 }).unique(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => cropCategoryTable.id),
    description: text("description").notNull(),
    nitrogen: integer("nitrogen").notNull(),
    phosphorus: integer("phosphorus").notNull(),
    potassium: integer("potassium").notNull(),
    estimatedProfit: numeric("estimated_profit").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("crop_category_id_idx").on(table.categoryId)],
);
