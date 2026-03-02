import { pgTable, uuid, text, timestamp, pgEnum, integer, uniqueIndex , check  } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { cropTable } from "./crop";

export const eventTypeEnum = pgEnum("event_type", [
  "seed",
  "nursery",
  "transplant",
  "harvest"
]);

export const regionTable = pgTable("regions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cropCalendarTable = pgTable("crop_calendar", {
  id: uuid("id").primaryKey().defaultRandom(),
  regionId: uuid("region_id")
    .notNull()
    .references(() => regionTable.id, { onDelete: "cascade" }),
  cropId: uuid("crop_id")
    .notNull()
    .references(() => cropTable.id, { onDelete: "cascade" }),
  eventType: eventTypeEnum("event_type").notNull(),
  month: integer("month").notNull(), // 1-12
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  check("month_check", sql`month >= 1 AND month <= 12`),
  uniqueIndex("unique_crop_calendar")
    .on(table.regionId, table.cropId, table.eventType, table.month),
]);