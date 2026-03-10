import { db } from "./db.config.js";
import { animalCalculate } from "./db/schema/animalCalculator.js";

async function seedAnimalCalculator() {
  try {
    console.log("Seeding animal calculator data...");

    await db.insert(animalCalculate).values([
      {
        name: "Cow",
        constant: "300",
      },
      {
        name: "Ox",
        constant: "300",
      },
      {
        name: "Sheep",
        constant: "250",
      },
      {
        name: "Goat (Male)",
        constant: "280",
      },
      {
        name: "Goat (Female)",
        constant: "290",
      },
    ]);

    console.log("✅ Animal calculator seed completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
}

seedAnimalCalculator();
