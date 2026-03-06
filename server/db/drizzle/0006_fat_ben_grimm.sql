CREATE TYPE "public"."category" AS ENUM('weather', 'market', 'government', 'other');--> statement-breakpoint
ALTER TABLE "notices" ALTER COLUMN "category" SET DATA TYPE "public"."category" USING "category"::"public"."category";--> statement-breakpoint
ALTER TABLE "notices" ALTER COLUMN "category" SET NOT NULL;