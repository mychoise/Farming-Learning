import { db } from "../db.config.js";
import { videoTable } from "../db/schema/video.js";
import { sql, eq } from "drizzle-orm";

export const addVideo = async (req, res) => {
  try {
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res
        .status(400)
        .json({ message: "Video and thumbnail are required" });
    }
    const video = req.files.video[0];
    const thumbnail = req.files.thumbnail[0];

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const [addedVideo] = await db
      .insert(videoTable)
      .values({
        video_link: video.path,
        thumbnail: thumbnail.path,
        title,
        description,
      })
      .returning();

    res.status(201).json({ success: true, video: addedVideo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getVideos = async (req, res) => {
  try {
    let { page } = req.query;
    page = page ? parseInt(page) : 1;
    const limit = 10;
    const videos = await db
      .select()
      .from(videoTable)
      .limit(limit)
      .offset((page - 1) * limit);

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(videoTable);

    res.status(200).json({
      success: true,
      videos,
      pagination: {
        page,
        limit,
        total: count,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [video] = await db
      .select()
      .from(videoTable)
      .where(eq(videoTable.id, id));
    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedVideo] = await db
      .delete(videoTable)
      .where(eq(videoTable.id, id))
      .returning();
    res.status(200).json({ success: true, video: deletedVideo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
