import { noticeTable } from "../db/schema/notice.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../db.config.js";

export const geAllNotices = async (req, res) => {
  try {
    let { page } = req.query;
    console.log("pade are",page)
    page = page ? parseInt(page) : 1;
    const limit = 9;
    const notices = await db
      .select()
      .from(noticeTable)
      .limit(limit)
      .offset((page - 1) * limit);
    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(noticeTable);

    return res.status(200).json({
      success: true,
      data: notices,
      pagination: {
        page,
        limit,
        total: count,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [notice] = await db
      .select()
      .from(noticeTable)
      .where(eq(noticeTable.id, id));
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
    return res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content and category are required",
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const [createdNotice] = await db
      .insert(noticeTable)
      .values({
        title,
        content,
        category,
        image: req.file.path,
      })
      .returning();

    console.log("Created notice:", createdNotice);

    return res.status(201).json({ success: true, data: createdNotice });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const [notice] = await db
      .delete(noticeTable)
      .where(eq(noticeTable.id, id))
      .returning();
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
