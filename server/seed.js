import { db } from "./db.js"; // your drizzle db instance
import {
  regionTable,
  cropCalendarTable,
} from "./db/schema/crop_calender.js";
import { cropTable } from "./db/schema/crop.js";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Seeding started...");

    // 1. Insert regions
    const regions = await db
      .insert(regionTable)
      .values([
        { name: "Terai" },
        { name: "Hills" },
        { name: "Mountains" },
      ])
      .returning();

    console.log("Regions inserted:", regions);

    // 2. Fetch crops (already seeded earlier)
    const crops = await db.select().from(cropTable);

    if (crops.length === 0) {
      throw new Error("No crops found. Seed crops first.");
    }

    // Helper to find crop by name
    const getCrop = (name) =>
      crops.find((c) => c.name.toLowerCase() === name.toLowerCase());

    const rice = getCrop("Rice");
    const potato = getCrop("Potato");
    const maize = getCrop("Maize");

    // 3. Insert crop calendar events
    const calendarData = [
      // Terai rice calendar
      {
        regionId: regions[0].id,
        cropId: rice.id,
        eventType: "seed",
        month: 5,
      },
      {
        regionId: regions[0].id,
        cropId: rice.id,
        eventType: "nursery",
        month: 5,
      },
      {
        regionId: regions[0].id,
        cropId: rice.id,
        eventType: "transplant",
        month: 6,
      },
      {
        regionId: regions[0].id,
        cropId: rice.id,
        eventType: "harvest",
        month: 10,
      },

      // Hills maize calendar
      {
        regionId: regions[1].id,
        cropId: maize.id,
        eventType: "seed",
        month: 3,
      },
      {
        regionId: regions[1].id,
        cropId: maize.id,
        eventType: "harvest",
        month: 7,
      },

      // Wheat calendar
      {
        regionId: regions[0].id,
        cropId: potato.id,
        eventType: "seed",
        month: 11,
      },
      {
        regionId: regions[0].id,
        cropId: potato.id,
        eventType: "harvest",
        month: 4,
      },
    ];

    await db.insert(cropCalendarTable).values(calendarData);

    console.log("Crop calendar seeded successfully.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    process.exit(0);
  }
}

seed();
