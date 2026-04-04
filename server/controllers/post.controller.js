import { postComment, postTable, postVote } from "../db/schema/posts.js";
import { db } from "../db.config.js";
import { eq, and, sql , desc } from "drizzle-orm";
import { validationResult } from "express-validator";
import { getIO } from "../config/socket.js";
import { userTable } from "../db/schema/user.js";

export const addPost = async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array() });
        }
    try {
        let {id:userId}  = req.user;
        let {title, description } = req.body;
        if(!title || !description){
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }
        let post;
        if(req.files && req.files.video && req.files.image){
            [post] = await db.insert(postTable).values({
                createdBy: userId,
                title,
                description,
                video: req.files.video[0].path,
                image: req.files.image[0].path
            }).returning();
        } else if(req.files && req.files.video){
            [post] = await db.insert(postTable).values({
                createdBy: userId,
                title,
                description,
                video: req.files.video[0].path
            }).returning();
        } else if(req.files && req.files.image){
            [post] = await db.insert(postTable).values({
                createdBy: userId,
                title,
                description,
                image: req.files.image[0].path
            }).returning();
        } else {
            [post] = await db.insert(postTable).values({
                createdBy: userId,
                title,
                description
            }).returning();
        }

        const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));

        const io = getIO();
        const dataToSend={
            post,
            user
            }
        io.emit("new_post", dataToSend);

        return res.status(201).json({ success: true, message: "Post created successfully", dataToSend });
    } catch (error) {
        console.log("Error in addPost: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await db.select({
            post: postTable,
            user: userTable,
            upvotes: sql`count(CASE WHEN ${postVote.vote} = 'upvote' THEN 1 END)`.as("upvotes"),
            downvotes: sql`count(CASE WHEN ${postVote.vote} = 'downvote' THEN 1 END)`.as("downvotes"),
            comments: sql`count(DISTINCT ${postComment.id})`.as("comments")
        })
        .from(postTable)
        .leftJoin(userTable, eq(postTable.createdBy, userTable.id))
        .leftJoin(postVote, eq(postTable.id, postVote.postId))
        .leftJoin(postComment, eq(postTable.id, postComment.postId))
        .groupBy(postTable.id, userTable.id);

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.log("Error in getAllPosts: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getIndividualPost = async (req, res) => {
    try {
        const { id } = req.params;
        const [postData] = await db.select({
            post: postTable,
            upvotes: sql`count(CASE WHEN ${postVote.vote} = 'upvote' THEN 1 END)`.as("upvotes"),
            downvotes: sql`count(CASE WHEN ${postVote.vote} = 'downvote' THEN 1 END)`.as("downvotes"),
        })
        .from(postTable)
        .where(eq(postTable.id, id))
        .leftJoin(postVote, eq(postTable.id, postVote.postId))
        .groupBy(postTable.id);

        const comments = await db.select({
            id: postComment.id,
            comment: postComment.comment,
            user: {
                id: userTable.id,
                name: userTable.name,
                image: userTable.image
            }
        })
        .from(postComment)
        .where(eq(postComment.postId, id))
        .leftJoin(userTable, eq(postComment.userId, userTable.id))

        res.status(200).json({ success: true, post: postData, comments });
    } catch (error) {
        console.log("Error in getIndividualPost: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMyPosts  = async(req,res)=>{
    let {id:userId} = req.user;
    try {
        const posts = await db.select().from(postTable).where(eq(postTable.createdBy, userId));
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.log("Error in getMyPosts: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const vote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array() });
    }
    try {
        const { id: userId } = req.user;
        const { id: postId } = req.params;
        const { voteType: type } = req.body;

        if (!['upvote', 'downvote'].includes(type)) {
            return res.status(400).json({ success: false, message: "Invalid vote type" });
        }

        // Check if vote already exists
        const [existingVote] = await db.select()
            .from(postVote)
            .where(and(eq(postVote.userId, userId), eq(postVote.postId, postId)));

        if (existingVote) {
            if (existingVote.vote === type) {
                // Toggle off: if clicking the same button, remove the vote
                await db.delete(postVote).where(eq(postVote.id, existingVote.id));
                return res.status(200).json({ success: true, message: "Vote removed", action: "removed" });
            } else {
                // Switch vote: change from upvote to downvote or vice versa
                const [updatedVote] = await db.update(postVote)
                    .set({ vote: type })
                    .where(eq(postVote.id, existingVote.id))
                    .returning();
                return res.status(200).json({ success: true, vote: updatedVote, action: "updated" });
            }
        } else {
            // New vote
            const [newVote] = await db.insert(postVote).values({
                userId,
                postId,
                vote: type
            }).returning();
            return res.status(200).json({ success: true, vote: newVote, action: "added" });
        }
    } catch (error) {
        console.log("Error in vote: ", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const allcomment = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await db
      .select({
        id: postComment.id,
        comment: postComment.comment,
        userId: userTable.id,
        userName: userTable.name,
        createdAt: postComment.createdAt,
      })
      .from(postComment)
.leftJoin(userTable, eq(postComment.userId, userTable.id))
      .where(eq(postComment.postId, id))
      .orderBy(desc(postComment.createdAt))

    const formattedComments = comments.map(c => ({
      id: c.id,
      comment: c.comment,
      user: {
        id: c.userId,
        name: c.userName,
      },
      createdAt: c.createdAt,
    }));

    const response =
      formattedComments.length > 0 ? formattedComments : null;

    res.status(200).json({ success: true, comments: response });
  } catch (error) {
    console.log("Error in allcomment: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const voteCounts = async(req,res)=>{
    try {
        const {id:userId} = req.user;
        const {id} = req.params;
        const likes= await db.select().from(postVote).where(and(eq(postVote.postId, id), eq(postVote.vote, "upvote")));
        const [dislikes] = await db.select().from(postVote).where(and(eq(postVote.postId, id), eq(postVote.vote, "downvote")));
       const likesCount = likes?.length||0
       const dislikesCount = dislikes?.length||0
        res.status(200).json({ success: true, likes, dislikes,likesCount,dislikesCount });
    } catch (error) {
        console.log(error)
        return res.status(200).json({success:false,message:error.message})
    }
}

export const comment = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id: postId } = req.params;
        const { comment } = req.body;

        if (!comment || comment.trim() === "") {
            return res.status(400).json({ success: false, message: "Comment cannot be empty" });
        }

        const [newComment] = await db.insert(postComment).values({
            userId,
            postId,
            comment
        }).returning();

        const [commentWithUser] = await db.select({
            id: postComment.id,
            comment: postComment.comment,
            createdAt: postComment.createdAt,
           userId: userTable.id,
        userName: userTable.name,
        })
        .from(postComment)
        .leftJoin(userTable, eq(postComment.userId, userTable.id))
        .where(eq(postComment.id, newComment.id));

        console.log(commentWithUser)

    const response =
      commentWithUser.length > 0 ? commentWithUser : null;

        const io = getIO();
        io.to(`post:${postId}`).emit("new_comment", response);

        return res.json({
            success: true,
            comment: response
        });
    } catch (error) {
        console.log("error in comment", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
