CREATE TYPE "public"."difficulty" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "public"."season" AS ENUM('spring', 'monsoon', 'winter', 'all');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('seed', 'nursery', 'transplant', 'harvest');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('weather', 'market', 'government', 'other');--> statement-breakpoint
CREATE TYPE "public"."vote_type" AS ENUM('upvote', 'downvote');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "ai_communication_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ai_disease_detection" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"image" text NOT NULL,
	"predicted_disease" text NOT NULL,
	"confirmatry_score" numeric NOT NULL,
	"description_of_disease_by_user" text NOT NULL,
	"description_of_disease_by_ai" text NOT NULL,
	"treatment" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ai_text_query" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"communication_id" uuid NOT NULL,
	"question" text NOT NULL,
	"response" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "animalCalculate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"constant" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crop_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "crop_category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "crop" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"nepali_name" varchar(255),
	"category_id" uuid NOT NULL,
	"description" text NOT NULL,
	"climate" varchar(255),
	"soil_type" varchar(255),
	"season" "season",
	"nitrogen" numeric NOT NULL,
	"phosphorus" numeric NOT NULL,
	"potassium" numeric NOT NULL,
	"growing_guide" text,
	"watering_schedule" text,
	"harvesting_tips" text,
	"difficulty" "difficulty",
	"profit_min" numeric,
	"profit_max" numeric,
	"image_url" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "crop_name_unique" UNIQUE("name"),
	CONSTRAINT "crop_nepali_name_unique" UNIQUE("nepali_name")
);
--> statement-breakpoint
CREATE TABLE "crop_calendar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"region_id" uuid NOT NULL,
	"crop_id" uuid NOT NULL,
	"event_type" "event_type" NOT NULL,
	"month" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "month_check" CHECK (month >= 1 AND month <= 12)
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chemical_fertilizer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"nitrogen" integer NOT NULL,
	"phosphorus" integer NOT NULL,
	"potassium" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "chemical_fertilizer_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "organic_fertilizer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"nitrogen" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "organic_fertilizer_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "notices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"image" text,
	"category" "category" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "postComment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"comment" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "postVote" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"vote" "vote_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" "role" NOT NULL,
	"refresh_token" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_refresh_token_unique" UNIQUE("refresh_token"),
	CONSTRAINT "email_check" CHECK ("user"."email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"video_link" text NOT NULL,
	"thumbnail" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "ai_communication_session" ADD CONSTRAINT "ai_communication_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD CONSTRAINT "ai_disease_detection_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_text_query" ADD CONSTRAINT "ai_text_query_communication_id_ai_communication_session_id_fk" FOREIGN KEY ("communication_id") REFERENCES "public"."ai_communication_session"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crop" ADD CONSTRAINT "crop_category_id_crop_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."crop_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crop_calendar" ADD CONSTRAINT "crop_calendar_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crop_calendar" ADD CONSTRAINT "crop_calendar_crop_id_crop_id_fk" FOREIGN KEY ("crop_id") REFERENCES "public"."crop"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postComment" ADD CONSTRAINT "postComment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postComment" ADD CONSTRAINT "postComment_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postVote" ADD CONSTRAINT "postVote_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postVote" ADD CONSTRAINT "postVote_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "crop_category_id_idx" ON "crop" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_crop_calendar" ON "crop_calendar" USING btree ("region_id","crop_id","event_type","month");--> statement-breakpoint
CREATE INDEX "notice_created_at" ON "notices" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notce_title" ON "notices" USING btree ("title");--> statement-breakpoint
CREATE INDEX "notice_category" ON "notices" USING btree ("category");--> statement-breakpoint
CREATE INDEX "postComment_userId_postId_idx" ON "postComment" USING btree ("user_id","post_id");--> statement-breakpoint
CREATE INDEX "post_created_by_idx" ON "posts" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "post_created_at_idx" ON "posts" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "postVote_userId_postId_idx" ON "postVote" USING btree ("user_id","post_id");--> statement-breakpoint
CREATE INDEX "video_title_idx" ON "video" USING btree ("title");--> statement-breakpoint
CREATE INDEX "video_created_at_idx" ON "video" USING btree ("created_at");