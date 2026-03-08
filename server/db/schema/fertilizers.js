import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";

export const organicFertilizerTable = pgTable("organic_fertilizer", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  nitrogen: decimal("nitrogen", { precision: 5, scale: 2 }).notNull(),   // N%
  phosphorus: decimal("phosphorus", { precision: 5, scale: 2 }).notNull(), // P%
  potassium: decimal("potassium", { precision: 5, scale: 2 }).notNull(),   // K%
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

