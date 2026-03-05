import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  index,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.js";

export const aiCommunicationSession = pgTable("ai_communication_session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiTextQuery = pgTable("ai_text_query", {
  id: uuid("id").primaryKey().defaultRandom(),

  communicationId: uuid("communication_id")
    .notNull()
    .references(() => aiCommunicationSession.id),

  question: text("question").notNull(),
  response: text("response").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const aiDiseaseDetection = pgTable("ai_disease_detection", {
  id: uuid("id").primaryKey().defaultRandom(),
  communicationId: uuid("communication_id")
    .notNull()
    .references(() => aiCommunicationSession.id),
  image: text("image").notNull(),
  predictedDisease: text("predicted_disease").notNull(),
  confirmatryScore: numeric("confirmatry_score").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
