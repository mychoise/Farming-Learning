import { db } from "../db.config.js";
import { cropCategoryTable, cropTable } from "../db/schema/crop.js";
import { eq, sql } from "drizzle-orm";

export const getAllcrop = async (req, res) => {
  try {
    let { page } = req.query;
    page = page ? parseInt(page) : 1;
    const limit = 10;
    const crop = await db
      .select()
      .from(cropTable)
      .leftJoin(
        cropCategoryTable,
        eq(cropTable.categoryId, cropCategoryTable.id),
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(cropTable);

    return res.status(200).json({
      success: true,
      crop,
      pagination: { page, limit, total: count },
    });
  } catch (error) {
    console.log("error in getting all crops");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getSpecificCrop = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Crop ID is required" });
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid crop id" });
    }

    const [crop] = await db
      .select()
      .from(cropTable)
      .leftJoin(
        cropCategoryTable,
        eq(cropTable.categoryId, cropCategoryTable.id),
      )
      .where(eq(cropTable.id, id));

    if (!crop) {
      return res
        .status(404)
        .json({ success: false, message: "Crop not found" });
    }

    return res.status(200).json({ success: true, crop });
  } catch (error) {
    console.log("error in getting specific crop");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const addCrop = async (req, res) => {
  try {
    const {
      name,
      nepaliName,
      description,
      categoryName,
      // NPK
      nitrogen,
      phosphorus,
      potassium,
      // Soil & Climate
      climate,
      soilType,
      season,
      // Growing info
      growingGuide,
      wateringSchedule,
      harvestingTips,
      difficulty,
      // Profit
      profitMin,
      profitMax,
    } = req.body;

    // Required fields only
    if (
      !name ||
      !description ||
      !categoryName ||
      !nitrogen ||
      !phosphorus ||
      !potassium
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, description, categoryName, nitrogen, phosphorus and potassium are required",
      });
    }

    // NPK must be valid positive numbers
    if (!Number(nitrogen) || !Number(phosphorus) || !Number(potassium)) {
      return res.status(400).json({
        success: false,
        message: "Nitrogen, phosphorus and potassium must be valid numbers",
      });
    }

    if (nitrogen < 0 || phosphorus < 0 || potassium < 0) {
      return res.status(400).json({
        success: false,
        message: "Nitrogen, phosphorus and potassium must be positive",
      });
    }

    // Profit validation (only if provided)
    if (profitMin && profitMax && Number(profitMin) > Number(profitMax)) {
      return res.status(400).json({
        success: false,
        message: "profitMin cannot be greater than profitMax",
      });
    }

    // Get or create category
    let [category] = await db
      .select()
      .from(cropCategoryTable)
      .where(eq(cropCategoryTable.name, categoryName));

    if (!category) {
      [category] = await db
        .insert(cropCategoryTable)
        .values({ name: categoryName })
        .returning();
    }

    // Image from multer/cloudinary
    const imageUrl = req.file?.path ?? null;

    const [crop] = await db
      .insert(cropTable)
      .values({
        name,
        nepaliName,
        description,
        categoryId: category.id,
        // NPK
        nitrogen,
        phosphorus,
        potassium,
        // Soil & Climate
        climate,
        soilType,
        season,
        // Growing info
        growingGuide,
        wateringSchedule,
        harvestingTips,
        difficulty,
        // Profit
        profitMin,
        profitMax,
        // Image
        imageUrl,
      })
      .returning();

    return res.status(201).json({ success: true, crop });
  } catch (error) {
    console.log("error in adding crop", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
