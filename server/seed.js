import { db } from "./db.config.js"; // your drizzle db instance
import { organicFertilizerTable } from "./db/schema/fertilizers.js";

async function seedOrganicFertilizers() {
  try {
    await db.insert(organicFertilizerTable).values([
      {
        name: "Farmyard Manure",
        nitrogen: "0.50",
        phosphorus: "0.20",
        potassium: "0.50",
      },
      {
        name: "Vermicompost",
        nitrogen: "1.50",
        phosphorus: "1.80",
        potassium: "0.60",
      },
      {
        name: "Compost",
        nitrogen: "0.60",
        phosphorus: "1.15",
        potassium: "2.30",
      },
      {
        name: "Mustard Oil Cake",
        nitrogen: "5.20",
        phosphorus: "1.80",
        potassium: "1.10",
      },
    ]);

    console.log("✅ Organic fertilizers seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding fertilizers:", error);
  } finally {
    process.exit(0);
  }
}

seedOrganicFertilizers();
