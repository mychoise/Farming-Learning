ALTER TABLE "ai_communication_session" DROP CONSTRAINT "ai_communication_session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ai_disease_detection" DROP CONSTRAINT "ai_disease_detection_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ai_text_query" DROP CONSTRAINT "ai_text_query_communication_id_ai_communication_session_id_fk";
--> statement-breakpoint
ALTER TABLE "postComment" DROP CONSTRAINT "postComment_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "postComment" DROP CONSTRAINT "postComment_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_vote_postVote_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_comment_postComment_id_fk";
--> statement-breakpoint
ALTER TABLE "postVote" DROP CONSTRAINT "postVote_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "postVote" DROP CONSTRAINT "postVote_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "ai_communication_session" ADD CONSTRAINT "ai_communication_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_disease_detection" ADD CONSTRAINT "ai_disease_detection_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_text_query" ADD CONSTRAINT "ai_text_query_communication_id_ai_communication_session_id_fk" FOREIGN KEY ("communication_id") REFERENCES "public"."ai_communication_session"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postComment" ADD CONSTRAINT "postComment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postComment" ADD CONSTRAINT "postComment_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_vote_postVote_id_fk" FOREIGN KEY ("vote") REFERENCES "public"."postVote"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_comment_postComment_id_fk" FOREIGN KEY ("comment") REFERENCES "public"."postComment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postVote" ADD CONSTRAINT "postVote_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postVote" ADD CONSTRAINT "postVote_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;