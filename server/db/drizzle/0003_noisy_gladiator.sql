ALTER TABLE "ai_disease_detection" DROP CONSTRAINT "ai_disease_detection_communication_id_ai_communication_session_id_fk";
--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD CONSTRAINT "ai_disease_detection_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" DROP COLUMN "communication_id";