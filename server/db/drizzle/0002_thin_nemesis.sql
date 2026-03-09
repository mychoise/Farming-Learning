ALTER TABLE "posts" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "video" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "vote" uuid;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "comment" uuid;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_vote_postVote_id_fk" FOREIGN KEY ("vote") REFERENCES "public"."postVote"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_comment_postComment_id_fk" FOREIGN KEY ("comment") REFERENCES "public"."postComment"("id") ON DELETE no action ON UPDATE no action;