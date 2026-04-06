import { postComment, postTable } from "../db/schema/posts.js";
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
        console.log(title, description , req.files);
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
            comments: sql`count(DISTINCT ${postComment.id})`.as("comments")
        })
        .from(postTable)
        .leftJoin(userTable, eq(postTable.createdBy, userTable.id))
        .leftJoin(postComment, eq(postTable.id, postComment.postId))
        .groupBy(postTable.id, userTable.id)
        .orderBy(desc(postTable.createdAt));

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
              })
        .from(postTable)
        .where(eq(postTable.id, id))
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

        console.log("commentWithUser", commentWithUser); // should print object now

        const io = getIO()
        io.to(`post:${postId}`).emit("new_comment", commentWithUser);
        return res.json({ success: true, comment: commentWithUser });

    } catch (error) {
        console.log("error in comment", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
