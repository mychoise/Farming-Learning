import { pgTable, uuid, text, timestamp, numeric , index } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const aiTextQuery = pgTable("ai_text_query", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  question: text("question").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const aiDiseaseDetection = pgTable(
  "ai_disease_detection",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id),
    image: text("image").notNull(),
    predictedDisease: text("predicted_disease").notNull(),
    confirmatryScore: numeric("confirmatry_score").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("ai_disease_detection_user_idx").on(table.userId)],
);
