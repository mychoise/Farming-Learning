import express from "express";
import {
  sendMessageToAi,
  createNewAiSession,
  getSpecificSessionAll,
  getAllCommunication,
  diseaseDetection,
} from "../controllers/ai.controller.js";
import { auth } from "../middleware/auth.js";
import upload from './../config/Image.config.js';

const aiRouter = express.Router();

aiRouter.post("/chat/:aiSessionId", auth, sendMessageToAi);
aiRouter.get("/chat/:aiSessionId", auth, getSpecificSessionAll);
aiRouter.get("/new-session", auth, createNewAiSession);
aiRouter.get("/all/history", auth, getAllCommunication);
aiRouter.post("/detect-disease", upload.single("image") ,auth, diseaseDetection);

export default aiRouter;
