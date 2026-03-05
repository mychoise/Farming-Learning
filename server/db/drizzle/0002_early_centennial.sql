ALTER TABLE "ai_communication_session" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "ai_communication_session" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "ai_communication_session" DROP COLUMN "started_at";--> statement-breakpoint
ALTER TABLE "ai_communication_session" DROP COLUMN "last_message_at";--> statement-breakpoint
ALTER TABLE "ai_communication_session" DROP COLUMN "expires_at";