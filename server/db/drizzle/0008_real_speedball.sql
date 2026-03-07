CREATE TYPE "public"."difficulty" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "public"."season" AS ENUM('spring', 'monsoon', 'winter', 'all');--> statement-breakpoint
ALTER TABLE "crop" ALTER COLUMN "nitrogen" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "crop" ALTER COLUMN "phosphorus" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "crop" ALTER COLUMN "potassium" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "climate" varchar(255);--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "soil_type" varchar(255);--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "season" "season";--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "growing_guide" text;--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "watering_schedule" text;--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "harvesting_tips" text;--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "difficulty" "difficulty";--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "profit_min" numeric;--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "profit_max" numeric;--> statement-breakpoint
ALTER TABLE "crop" ADD COLUMN "image_url" varchar(500);--> statement-breakpoint
ALTER TABLE "crop" DROP COLUMN "estimated_profit";