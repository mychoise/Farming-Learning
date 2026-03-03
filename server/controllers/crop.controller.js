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
      pagination: {
        page,
        limit,
        total: count,
      },
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
      return res.status(400).json({
        success: false,
        message: "Invalid crop id",
      });
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
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
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
      description,
      nepaliName,
      nitrogen,
      phosphorus,
      potassium,
      categoryName,
      estimatedProfit,
    } = req.body;

    if (
      !name ||
      !description ||
      !nitrogen ||
      !phosphorus ||
      !potassium ||
      !estimatedProfit ||
      !categoryName
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      !Number(nitrogen) ||
      !Number(phosphorus) ||
      !Number(potassium) ||
      !Number(estimatedProfit)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Nitrogen, phosphorus, potassium, and estimated profit must be numbers",
      });
    }

    if (estimatedProfit < 0) {
      return res.status(400).json({
        success: false,
        message: "Estimated profit must be a positive number",
      });
    }

    if (nitrogen < 0 || phosphorus < 0 || potassium < 0) {
      return res.status(400).json({
        success: false,
        message: "Nitrogen, phosphorus, and potassium must be positive numbers",
      });
    }
    // ✅ Check if category already exists first
    let [category] = await db
      .select()
      .from(cropCategoryTable)
      .where(eq(cropCategoryTable.name, categoryName));

    console.log("Category:", category);

    // ✅ Only create if it doesn't exist
    if (!category) {
      [category] = await db
        .insert(cropCategoryTable)
        .values({ name: categoryName })
        .returning();
      console.log("Created category:", category);
    } else {
      console.log("Category already exists:", category);
    }

    // ✅ Add .returning() to get the inserted crop back
    const [crop] = await db
      .insert(cropTable)
      .values({
        name,
        description,
        nepaliName,
        categoryId: category.id,
        nitrogen,
        phosphorus,
        potassium,
        estimatedProfit,
      })
      .returning();

    return res.status(201).json({ success: true, crop });
  } catch (error) {
    console.log("error in adding crop");
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
