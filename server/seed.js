import { drizzle } from "drizzle-orm/node-postgres";
import { noticeTable } from "./db/schema/notice.js";
import {db} from "./db.js"



// ── Seed data ────────────────────────────────────────────────────────────────
const seedNotices = [
  // weather
  {
    title: "Monsoon Season Advisory",
    content:
      "Heavy rainfall is expected across the valley from June through September. Residents in low-lying areas should take precautions and monitor official weather updates.",
    image: "https://images.unsplash.com/photo-1504608524841-42584120d63f?w=800",
    category: "weather",
  },
  {
    title: "Heatwave Warning Issued",
    content:
      "Temperatures are forecast to exceed 40 °C over the next 72 hours. Stay hydrated, avoid outdoor activity during peak hours (11 AM – 4 PM), and check on elderly neighbours.",
    image: null,
    category: "weather",
  },
  {
    title: "Fog Alert for Mountain Roads",
    content:
      "Dense fog has been reported on Tribhuwan Highway and Prithvi Highway. Drivers are advised to use fog lights and maintain reduced speeds until further notice.",
    image: null,
    category: "weather",
  },

  // market
  {
    title: "Weekly Vegetable Price Update",
    content:
      "Tomato prices have risen 15 % this week due to supply disruptions. Potato and onion prices remain stable. Visit the municipal market board for the full price list.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    category: "market",
  },
  {
    title: "New Trading Hours at Ason Market",
    content:
      "Effective from the 1st of next month, Ason Bazaar will operate from 6 AM to 8 PM on weekdays and 6 AM to 10 PM on weekends to accommodate increased footfall.",
    image: null,
    category: "market",
  },
  {
    title: "Livestock Fair – Annual Registration Open",
    content:
      "Farmers wishing to participate in this year's livestock fair should register at the District Agriculture Office before the end of the month. Entry is free for registered smallholders.",
    image: null,
    category: "market",
  },

  // government
  {
    title: "Public Holiday – Constitution Day",
    content:
      "In observance of Constitution Day, all government offices, schools, and public institutions will remain closed. Emergency services will operate as normal.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    category: "government",
  },
  {
    title: "Voter Registration Drive",
    content:
      "The Election Commission invites all eligible citizens who have not yet registered to visit their nearest ward office with valid citizenship documents before the registration deadline.",
    image: null,
    category: "government",
  },
  {
    title: "Water Supply Interruption Notice",
    content:
      "Due to scheduled maintenance on the main pipeline, water supply to wards 5, 6, and 7 will be suspended from 6 AM to 2 PM this Sunday. Residents are advised to store water in advance.",
    image: null,
    category: "government",
  },

  // other
  {
    title: "Community Clean-Up Drive",
    content:
      "Join your neighbours this Saturday for a community clean-up of Bagmati riverbanks. Gloves and bags will be provided. Meet at the Teku bridge at 7 AM.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    category: "other",
  },
  {
    title: "Blood Donation Camp",
    content:
      "A free blood donation camp will be held at the community hall on Friday from 9 AM to 4 PM. All blood groups are urgently needed. Bring a valid ID and stay hydrated before donating.",
    image: null,
    category: "other",
  },
  {
    title: "Internet Maintenance Downtime",
    content:
      "The local ISP has informed that internet services may experience intermittent outages between midnight and 4 AM on Thursday night due to infrastructure upgrades.",
    image: null,
    category: "other",
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("🌱 Seeding notices table…");

  try {
    const inserted = await db
      .insert(noticeTable)
      .values(seedNotices)

    console.log(`✅ Inserted ${inserted.length} notices:`);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
