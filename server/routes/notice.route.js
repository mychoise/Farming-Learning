import express from "express";
import { auth } from "./../middleware/auth.js";
import {
  geAllNotices,
  getNoticeById,
  createNotice,
  deleteNotice,
} from "./../controllers/notice.controller.js";
import { admin } from "./../middleware/admin.js";
import upload from "./../config/Image.config.js";

const newsRouter = express.Router();

newsRouter.get("/allnews", geAllNotices);
newsRouter.get("/news/:id", getNoticeById);
newsRouter.post("/create", auth, admin, upload.single("image"), createNotice);
newsRouter.delete("/delete/:id", auth, admin, deleteNotice);

export default newsRouter;
