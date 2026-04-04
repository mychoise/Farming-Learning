import express from "express"
import { addPost, getAllPosts , getIndividualPost, vote, comment , allcomment ,voteCounts} from "../controllers/post.controller.js"

import { auth } from "../middleware/auth.js"
import postImageandVideo from "../config/postImageandVideo.config.js"
import { body } from "express-validator"
const postRouter = express.Router()

const voteValidation = [
  body("voteType").isIn(["upvote", "downvote"])
]
const commentValidation = [
  body("comment").isLength({ min: 1 })
]
const postValidation = [
  body("title").isLength({ min: 1 }),
  body("description").isLength({ min: 1 })
]

postRouter.post("/create", auth, postImageandVideo.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]),postValidation, addPost)
postRouter.get("/get-posts", auth, getAllPosts)
postRouter.get("/get-post/:id", auth, getIndividualPost)
postRouter.post("/vote/:id", auth, voteValidation, vote)
postRouter.post("/comment/:id", auth, commentValidation, comment)
postRouter.get("/comment/:id", auth, allcomment)
postRouter.get("/vote/:id", auth, voteCounts)



export default postRouter
