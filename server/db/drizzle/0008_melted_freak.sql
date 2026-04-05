DROP TABLE "postVote" CASCADE;--> statement-breakpoint
ALTER TABLE "postComment" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "postComment" DROP COLUMN "created_at";--> statement-breakpoint
DROP TYPE "public"."vote_type";