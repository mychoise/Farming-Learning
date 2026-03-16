import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  index,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", [
  "beginner",
  "intermediate",
  "advanced",
]);
export const seasonEnum = pgEnum("season", [
  "spring",
  "monsoon",
  "winter",
  "all",
]);

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
    scientificName: varchar("scientific_name", { length: 255 }).unique(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => cropCategoryTable.id),
    description: text("description").notNull(),
    icon: text("icon"),
    // Soil & Climate
    climate: varchar("climate", { length: 255 }),
    soilType: varchar("soil_type", { length: 255 }),
    season: seasonEnum("season"),
    // NPK
    nitrogen: numeric("nitrogen").notNull(),
    phosphorus: numeric("phosphorus").notNull(),
    potassium: numeric("potassium").notNull(),
    // Growing info
    growingGuide: text("growing_guide"),
    wateringSchedule: text("watering_schedule"),
    harvestingTips: text("harvesting_tips"),
    difficulty: difficultyEnum("difficulty"),
    // Profit
    profitMin: numeric("profit_min"),
    profitMax: numeric("profit_max"),
    // UI
    imageUrl: varchar("image_url", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("crop_category_id_idx").on(table.categoryId)],
);
