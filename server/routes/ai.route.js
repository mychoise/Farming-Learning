import express from "express";
import {
  sendMessageToAi,
  createNewAiSession,
  getSpecificSessionAll,
  getAllCommunication,
} from "../controllers/ai.controller.js";
import { auth } from "../middleware/auth.js";

const aiRouter = express.Router();

aiRouter.post("/chat/:aiSessionId", auth, sendMessageToAi);
aiRouter.get("/chat/:aiSessionId", auth, getSpecificSessionAll);
aiRouter.get("/new-session", auth, createNewAiSession);
aiRouter.get("/all/history", auth, getAllCommunication);

export default aiRouter;
