import { generateAIResponse } from "../utils/gemini.js";
import { db } from "../db.config.js";
import { aiCommunicationSession, aiTextQuery } from "../db/schema/aiQuery.js";
import { and, eq, sql } from "drizzle-orm";

export const sendMessageToAi = async (req, res) => {
  const { id: userId } = req.user;
  const { aiSessionId } = req.params;
  const { question } = req.body;

  if (!question) {
    return res
      .status(400)
      .json({ success: false, message: "Question is required" });
  }
  if (!aiSessionId) {
    return res
      .status(400)
      .json({ success: false, message: "AI session ID is required" });
  }

  try {
    // Check session exists and belongs to user
    const [aiCommunicationSessionData] = await db
      .select()
      .from(aiCommunicationSession)
      .where(
        and(
          eq(aiCommunicationSession.id, aiSessionId),
          eq(aiCommunicationSession.userId, userId),
        ),
      )
      .limit(1);

    if (!aiCommunicationSessionData) {
      return res.status(404).json({
        success: false,
        message: "AI communication session not found",
      });
    }

    // Check if first question for this session
    const existingQueryCountResult = await db
      .select({
        count: sql`count(*)`.mapWith(Number),
      })
      .from(aiTextQuery)
      .where(eq(aiTextQuery.communicationId, aiSessionId));

    // FIX 1: existingQueryCountResult is an array, index into [0]
    const queryCount = existingQueryCountResult[0]?.count || 0;
    const isFirstQuestion = queryCount === 0;

    // Generate AI response
    const aiResponse = await generateAIResponse(question);

    // FIX 2: transaction returns insertedQuery (object), not an array — remove brackets
    const aiTextQueryData = await db.transaction(async (tx) => {
      const [insertedQuery] = await tx
        .insert(aiTextQuery)
        .values({
          communicationId: aiSessionId,
          question,
          response: aiResponse,
        })
        .returning();

      // If first question, update session title
      if (isFirstQuestion) {
        await tx
          .update(aiCommunicationSession)
          .set({ title: question })
          .where(eq(aiCommunicationSession.id, aiSessionId))
          .execute();
      }

      return insertedQuery;
    });

    return res.status(200).json({ success: true, data: aiTextQueryData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createNewAiSession = async (req, res) => {
  try {
    const { id: userId } = req.user;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const [aiCommunicationSessionData] = await db
      .insert(aiCommunicationSession)
      .values({
        userId,
      })
      .returning();

    return res
      .status(200)
      .json({ success: true, data: aiCommunicationSessionData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getSpecificSessionAll = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { aiSessionId } = req.params;
    console.log("params is", aiSessionId)
    const [aiSession] = await db.select().from(aiCommunicationSession).where(and(eq(aiCommunicationSession.id, aiSessionId), eq(aiCommunicationSession.userId, userId)));
    if (!aiSession) {
      return res.status(404).json({ success: false, message: "AI session not found" });
    }
    const allData = await db
      .select()
      .from(aiTextQuery)
      .where(and(eq(aiTextQuery.communicationId, aiSession.id)));

      if(!allData){
        return res.status(404).json({ success: false, message: "No data found" });
      }

    return res.status(200).json({ success: true, data: allData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllCommunication = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const allData = await db
      .select()
      .from(aiCommunicationSession)
      .where(eq(aiCommunicationSession.userId, userId));

      if(!allData || allData.length === 0){
        return res.status(404).json({ success: false, message: "No data found" });
      }

    return res.status(200).json({ success: true, data: allData });
  } catch (error) {
    console.log("error in getting all history", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

