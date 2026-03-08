ALTER TABLE "chemical_fertilizer" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "chemical_fertilizer" CASCADE;--> statement-breakpoint
ALTER TABLE "organic_fertilizer" ALTER COLUMN "nitrogen" SET DATA TYPE numeric(5, 2);--> statement-breakpoint
ALTER TABLE "organic_fertilizer" ADD COLUMN "phosphorus" numeric(5, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "organic_fertilizer" ADD COLUMN "potassium" numeric(5, 2) NOT NULL;