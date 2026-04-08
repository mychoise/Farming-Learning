import { db } from "./db.js";
import { cropCalendarTable, regionTable } from "./db/schema/crop_calender.js";
import { cropTable } from "./db/schema/crop.js";
import { inArray } from "drizzle-orm";

// ── Crop names to look up ─────────────────────────────────────────────────────
const CROP_NAMES = ["Tomato", "Potato", "Rice", "Maize", "Chili Pepper", "Cauliflower"];

// ── Calendar template (uses crop name as key, resolved to ID at runtime) ──────
const calendarTemplate = [
  // Tomato
  { crop: "Tomato",       eventType: "seed",       month: 2  },
  { crop: "Tomato",       eventType: "nursery",     month: 3  },
  { crop: "Tomato",       eventType: "transplant",  month: 4  },
  { crop: "Tomato",       eventType: "harvest",     month: 7  },

  // Potato
  { crop: "Potato",       eventType: "seed",        month: 11 },
  { crop: "Potato",       eventType: "harvest",     month: 4  },

  // Rice
  { crop: "Rice",         eventType: "seed",        month: 5  },
  { crop: "Rice",         eventType: "nursery",     month: 5  },
  { crop: "Rice",         eventType: "transplant",  month: 6  },
  { crop: "Rice",         eventType: "harvest",     month: 10 },

  // Maize
  { crop: "Maize",        eventType: "seed",        month: 3  },
  { crop: "Maize",        eventType: "harvest",     month: 7  },

  // Chili Pepper
  { crop: "Chili Pepper", eventType: "seed",        month: 1  },
  { crop: "Chili Pepper", eventType: "nursery",     month: 2  },
  { crop: "Chili Pepper", eventType: "transplant",  month: 3  },
  { crop: "Chili Pepper", eventType: "harvest",     month: 7  },

  // Cauliflower
  { crop: "Cauliflower",  eventType: "seed",        month: 9  },
  { crop: "Cauliflower",  eventType: "nursery",     month: 9  },
  { crop: "Cauliflower",  eventType: "transplant",  month: 10 },
  { crop: "Cauliflower",  eventType: "harvest",     month: 12 },
];

export async function seed() {
  // 1. Fetch all matching crops from DB
  const crops = await db
      .select({ id: cropTable.id, name: cropTable.name })
      .from(cropTable)
      .where(inArray(cropTable.name, CROP_NAMES));

  if (crops.length === 0) throw new Error("No crops found. Seed crops first.");

  const cropMap = Object.fromEntries(crops.map((c) => [c.name, c.id]));

  const missingCrops = CROP_NAMES.filter((name) => !cropMap[name]);
  if (missingCrops.length > 0) {
    throw new Error(`Missing crops in DB: ${missingCrops.join(", ")}`);
  }

  // 2. Fetch the first region from DB
  const [region] = await db
      .select({ id: regionTable.id, name: regionTable.name })
      .from(regionTable)
      .limit(1);

  if (!region) throw new Error("No regions found. Seed regions first.");

  console.log(`Using region: "${region.name}" (${region.id})`);

  // 3. Build entries
  const entries = calendarTemplate.map(({ crop, eventType, month }) => ({
    regionId:  region.id,
    cropId:    cropMap[crop],
    eventType,
    month,
  }));

  // 4. Insert, skip duplicates
  await db
      .insert(cropCalendarTable)
      .values(entries)
      .onConflictDoNothing();

  console.log(`✓ Seeded ${entries.length} crop calendar entries.`);
}

await seed();