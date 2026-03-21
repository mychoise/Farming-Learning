import { db } from "./db.config.js"; // your Drizzle DB instance
import { animalCalculate } from "./db/schema/animalCalculator.js";

async function seedAnimals() {
  const animals = [
    { name: "buffalo", constant: 10840 }, // replace with actual formula constant
    { name: "cow", constant: 10840},     // replace with actual formula constant
    { name: "goat", constant: 300 },     // replace with actual formula constant
    { name: "sheep", constant: 300 },    // replace with actual formula constant
  ];

  for (const animal of animals) {
    await db.insert(animalCalculate).values(animal).onConflictDoNothing();
  }

  console.log("Animal constants seeded successfully!");
}

seedAnimals()
  .catch((err) => console.error("Error seeding animals:", err))
  .finally(() => process.exit());
