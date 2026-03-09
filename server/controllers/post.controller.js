import { postComment, postTable, postVote } from "../db/schema/posts.js";
import { db } from "../db.config.js";
import { eq,and } from "drizzle-orm";
import { validationResult } from "express-validator";

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
        if(req.files.video && req.files.image){
            const [post] = await db.insert(postTable).values({
                createdBy: userId,
                title,
                description,
                video: req.files.video[0].path,
                image: req.files.image[0].path
            }).returning();
            
            return res.status(201).json({ success: true, message: "Post created successfully", post });
        }
        if(req.files.video){
            const [post] = await db.insert(postTable).values({
                createdBy: userId,
                title,
                description,
                video: req.files.video[0].path
            }).returning();
            
            return res.status(201).json({ success: true, message: "Post created successfully", post });
        }
        if(req.files.image){
            const [post] = await db.insert(postTable).values({
                createdBy: userId,
                title,
                description,
                image: req.files.image[0].path
            }).returning();
            
            return res.status(201).json({ success: true, message: "Post created successfully", post });
        }
const [post] = await db.insert(postTable).values({
    createdBy: userId,
    title,
    description
}).returning();

return res.status(201).json({ success: true, message: "Post created successfully", post });
    } catch (error) {
        console.log("Error in addPost: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await db.select().from(postTable).leftJoin(postVote,eq(postTable.vote,postVote.id));
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.log("Error in getAllPosts: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getIndividualPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.select().from(postTable).where(eq(postTable.id, id)).leftJoin(postVote,eq(postTable.vote,postVote.id)).leftJoin(postComment,eq(postTable.comment,postComment.id));
        res.status(200).json({ success: true, post , data:"jj" });
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
        const { id:userId } = req.user;
        const {id} = req.params;
        const { voteType } = req.body;
        const [vote]= await db.insert(postVote).values({
            userId,
            postId:id,
            vote:voteType
        }).returning()

         const [post] = await db
      .update(postTable)
      .set({ vote: vote.id })
      .where(eq(postTable.id, id))
      .returning(); 
        res.status(200).json({ success: true, vote, post });
    } catch (error) {
        console.log("Error in vote: ", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const comment = async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array() });
        }
    try {
        const { id:userId } = req.user;
        const {id} = req.params;
        const { comment } = req.body;
        const [commentData] = await db.insert(postComment).values({
            userId,
            postId:id,
            comment
        }).returning()

        const [post] = await db
        .update(postTable)
        .set({ comment: commentData.id })
        .where(eq(postTable.id, id))
        .returning(); 

        res.status(200).json({ success: true, comment: commentData , post });
    } catch (error) {
        console.log("Error in comment: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const allcomment = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await db.select().from(postComment).where(eq(postComment.postId, id));
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log("Error in allcomment: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

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