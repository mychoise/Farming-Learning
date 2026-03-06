ALTER TABLE "ai_disease_detection" ADD COLUMN "description_of_disease_by_user" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD COLUMN "description_of_disease_by_ai" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD COLUMN "treatment" text NOT NULL;