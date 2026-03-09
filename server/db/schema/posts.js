import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { uuid, varchar, text, timestamp, numeric, integer } from "drizzle-orm/pg-core";
import { index , uniqueIndex } from "drizzle-orm/pg-core";
import { userTable } from "./user.js";


export const voteType = pgEnum("vote_type", ["upvote", "downvote"]);

export const postVote = pgTable("postVote",{
    id:uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => userTable.id, {onDelete:'cascade'}),
    postId: uuid("post_id").notNull().references(() => postTable.id, {onDelete:'cascade'}),
    vote: voteType("").notNull(),
},(table)=>[
    uniqueIndex("postVote_userId_postId_idx").on(table.userId, table.postId),
])

export const postComment = pgTable("postComment",{
    id:uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => userTable.id, {onDelete:'cascade'}),
    postId: uuid("post_id").notNull().references(() => postTable.id, {onDelete:'cascade'}),
    comment:text("comment").notNull(),
},(table)=>[
    index("postComment_userId_postId_idx").on(table.userId, table.postId),
])


export const postTable  = pgTable("posts",{
    id: uuid("id").primaryKey().defaultRandom(),
    title:varchar("title", { length: 255 }).notNull(),
    image:text("image"),
    video:text("video"),
    description:text("description").notNull(),
    vote: uuid("vote").references(()=> postVote.id , {onDelete:'cascade'}),
    comment: uuid("comment").references(()=> postComment.id , {onDelete:'cascade'}),
    createdBy: uuid("created_by").notNull().references(() => userTable.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
},(table)=>[
    index("post_created_by_idx").on(table.createdBy),
    index("post_created_at_idx").on(table.createdAt),
])