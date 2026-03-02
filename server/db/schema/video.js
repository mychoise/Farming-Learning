import {
  pgTable,
  uuid,
  timestamp,
  text,
  varchar,
  index,
} from "drizzle-orm/pg-core";

export const videoTable = pgTable(
  "video",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 50 }).notNull(),
    description: text("description").notNull(),
    video_link: text("video_link").notNull(),
    thumbnail: text("thumbnail").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("video_title_idx").on(table.title),
    index("video_created_at_idx").on(table.createdAt),
  ],
);
