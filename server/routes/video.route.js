import express from "express";
import { admin } from "./../middleware/admin.js";
import { auth } from "./../middleware/auth.js";
import upload from "./../config/Video.config.js";
import {
  addVideo,
  deleteVideo,
  getVideoById,
  getVideos,
} from "../controllers/video.controller.js";

const videoRouter = express.Router();

videoRouter.post(
  "/add",
  auth,
  admin,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  addVideo,
);
videoRouter.get("/allVideo", auth, getVideos);
videoRouter.get("/get-video/:id", auth, getVideoById);
videoRouter.delete("/video/:id", auth, admin, deleteVideo);

export default videoRouter;
