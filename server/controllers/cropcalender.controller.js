import { db } from "../db.config.js";
import { cropTable } from "../db/schema/crop.js";
import { cropCalendarTable, regionTable } from "../db/schema/crop_calender.js";
import { eq } from "drizzle-orm";

// export const makeCropCalender = async (req, res) => {
//   console.log("Making crop calender");
//   try {
//     const { regionName, cropName, eventType, month } = req.body;
//     let [region] = await db
//       .select()
//       .from(regionTable)
//       .where(eq(regionTable.name, regionName));
//     if (!region) {
//       [region] = await db
//         .insert(regionTable)
//         .values({ name: regionName })
//         .returning();
//     }
//     const [crop] = await db
//       .select()
//       .from(cropTable)
//       .where(eq(cropTable.name, cropName));
//
//     if (!crop) {
//       return res.status(404).json({
//         success: false,
//         message: "Crop not found",
//       });
//     }
//     const [cropCalender] = await db
//       .insert(cropCalendarTable)
//       .values({
//         regionId: region.id,
//         cropId: crop.id,
//         eventType: eventType,
//         month: month,
//       })
//       .returning();
//
//     res.status(201).json({
//       success: true,
//       message: "Crop calender created successfully",
//       data: cropCalender,
//     });
//   } catch (error) {
//     console.log("Error in makeCropCalender: ", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const deleteCropCalender = async (req, res) => {
  console.log("Deleting crop calender");
  try {
    const { id } = req.params;
    const [cropCalender] = await db
      .delete(cropCalendarTable)
      .where(eq(cropCalendarTable.id, id))
      .returning();
    res.status(200).json({
      success: true,
      message: "Crop calender deleted successfully",
      data: cropCalender,
    });
  } catch (error) {
    console.log("Error in deleteCropCalender: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCropCalender = async (req, res) => {
  console.log("Getting crop calender");
  try {
    const cropCalender = await db
      .select()
      .from(cropCalendarTable)
      .innerJoin(cropTable, eq(cropCalendarTable.cropId, cropTable.id))
      .innerJoin(regionTable, eq(cropCalendarTable.regionId, regionTable.id));
    res.status(200).json({
      success: true,
      message: "Crop calender fetched successfully",
      data: cropCalender,
    });
  } catch (error) {
    console.log("Error in getCropCalender: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
