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
    console.log(error);
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
      icon,
      categoryName,
      nitrogen,
      phosphorus,
      potassium,
      climate,
      soilType,
      season,
      growingGuide,
      wateringSchedule,
      harvestingTips,
      difficulty,
      profitMin,
      profitMax,
    } = req.body;

    // Required fields
    if (
      !name ||
      !description ||
      !categoryName ||
      !nitrogen ||
      !phosphorus ||
      !potassium ||
      !icon
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, description, categoryName, icon, nitrogen, phosphorus and potassium are required",
      });
    }

    // Convert NPK to numbers first
    const n = Number(nitrogen);
    const p = Number(phosphorus);
    const k = Number(potassium);

    // ✅ Fix 1: use isNaN instead of !Number()
    if (isNaN(n) || isNaN(p) || isNaN(k)) {
      return res.status(400).json({
        success: false,
        message: "nitrogen, phosphorus and potassium must be valid numbers",
      });
    }

    // ✅ Fix 2: compare converted numbers not raw strings
    if (n < 0 || p < 0 || k < 0) {
      return res.status(400).json({
        success: false,
        message: "nitrogen, phosphorus and potassium must be positive",
      });
    }

    // ✅ Fix 3: enum validation
    const VALID_SEASONS = ["spring", "monsoon", "winter", "all"];
    const VALID_DIFFICULTIES = ["beginner", "intermediate", "advanced"];

    if (season && !VALID_SEASONS.includes(season)) {
      return res.status(400).json({
        success: false,
        message: `season must be one of: ${VALID_SEASONS.join(", ")}`,
      });
    }

    if (difficulty && !VALID_DIFFICULTIES.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: `difficulty must be one of: ${VALID_DIFFICULTIES.join(", ")}`,
      });
    }

    // Profit validation
    if (profitMin && profitMax && Number(profitMin) > Number(profitMax)) {
      return res.status(400).json({
        success: false,
        message: "profitMin cannot be greater than profitMax",
      });
    }

    // ✅ Fix 4: parseList for text fields (handles textarea \n naturally)
    const parseList = (val) => {
      if (!val) return null;
      if (Array.isArray(val)) return val.join("\n");
      return val.trim();
    };

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

    const imageUrl = req.file?.path ?? null;

    const [crop] = await db
      .insert(cropTable)
      .values({
        name,
        nepaliName: nepaliName || null,
        description,
        icon,
        categoryId: category.id,
        nitrogen: String(n),
        phosphorus: String(p),
        potassium: String(k),
        climate: climate || null,
        soilType: soilType || null,
        season: season || null,
        growingGuide: parseList(growingGuide),
        wateringSchedule: parseList(wateringSchedule),
        harvestingTips: parseList(harvestingTips),
        difficulty: difficulty || null,
        profitMin: profitMin ? String(profitMin) : null,
        profitMax: profitMax ? String(profitMax) : null,
        imageUrl,
      })
      .returning();

    return res.status(201).json({ success: true, crop });
  } catch (error) {
    console.error("error in addCrop:", error);

    // ✅ Fix 5: handle duplicate crop name gracefully
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A crop with this name already exists",
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
