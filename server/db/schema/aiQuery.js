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
    .references(() => userTable.id, {onDelete:'cascade'}),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiTextQuery = pgTable("ai_text_query", {
  id: uuid("id").primaryKey().defaultRandom(),

  communicationId: uuid("communication_id")
    .notNull()
    .references(() => aiCommunicationSession.id, {onDelete:'cascade'}),

  question: text("question").notNull(),
  response: text("response").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const aiDiseaseDetection = pgTable("ai_disease_detection", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => userTable.id, {onDelete:'cascade'}),
  image: text("image").notNull(),
  predictedDisease: text("predicted_disease").notNull(),
  confirmatryScore: numeric("confirmatry_score").notNull(),
  descriptionOfDiseaseByUser: text("description_of_disease_by_user").notNull(),
  descriptionOfDiseaseByAI: text("description_of_disease_by_ai").notNull(),
  treatment: text("treatment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
