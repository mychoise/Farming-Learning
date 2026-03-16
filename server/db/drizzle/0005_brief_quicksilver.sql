ALTER TABLE "crop" ADD COLUMN "scientific_name" varchar(255);--> statement-breakpoint
ALTER TABLE "crop" ADD CONSTRAINT "crop_scientific_name_unique" UNIQUE("scientific_name");