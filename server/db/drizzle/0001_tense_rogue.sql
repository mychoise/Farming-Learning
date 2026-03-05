CREATE TABLE "ai_communication_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"started_at" timestamp DEFAULT now(),
	"last_message_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_disease_detection" DROP CONSTRAINT "ai_disease_detection_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ai_text_query" DROP CONSTRAINT "ai_text_query_user_id_user_id_fk";
--> statement-breakpoint
DROP INDEX "ai_disease_detection_user_idx";--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD COLUMN "communication_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_text_query" ADD COLUMN "communication_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_communication_session" ADD CONSTRAINT "ai_communication_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD CONSTRAINT "ai_disease_detection_communication_id_ai_communication_session_id_fk" FOREIGN KEY ("communication_id") REFERENCES "public"."ai_communication_session"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_text_query" ADD CONSTRAINT "ai_text_query_communication_id_ai_communication_session_id_fk" FOREIGN KEY ("communication_id") REFERENCES "public"."ai_communication_session"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "ai_disease_detection" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "ai_text_query" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "ai_text_query" DROP COLUMN "updated_at";