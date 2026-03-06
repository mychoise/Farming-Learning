import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";


export const categoryEnum = pgEnum("category", ["weather", "market", "government","other"]);


export const noticeTable = pgTable(
  "notices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    image: text("image"),
    category: categoryEnum("category").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("notice_created_at").on(table.createdAt),
    index("notce_title").on(table.title),
    index("notice_category").on(table.category),
  ],
);
