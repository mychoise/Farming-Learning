import { db } from "./db.js";
import { cropCategoryTable, cropTable } from "./db/schema/crop.js";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // -----------------------------
    // Insert Categories
    // -----------------------------
    const categories = await db
      .insert(cropCategoryTable)
      .values([
        { name: "Vegetables" },
        { name: "Fruits" },
        { name: "Cereals" },
        { name: "Legumes" },
        { name: "Spices" },
      ])
      .returning();

    const categoryMap = {};
    categories.forEach((c) => {
      categoryMap[c.name] = c.id;
    });

    // -----------------------------
    // Insert Crops
    // -----------------------------
    await db.insert(cropTable).values([
      {
        name: "Tomato",
        nepaliName: "गोलभेंडा",
        scientificName: "Solanum lycopersicum",
        categoryId: categoryMap["Vegetables"],
        description:
          "Tomato is one of the most widely cultivated vegetable crops in the world and is extremely popular in Nepalese agriculture. It is used in salads, curries, sauces, pickles, and many traditional dishes. Tomatoes grow best in warm climates with good sunlight and well-drained soil. Due to its high demand in local markets and restaurants, tomato farming can be very profitable for small and commercial farmers.",

        icon: "🍅",
        climate: "Warm climate with good sunlight",
        soilType: "Well-drained fertile loamy soil",
        season: "spring",

        nitrogen: "120",
        phosphorus: "80",
        potassium: "150",

        growingGuide: [
          {
            title: "Seed Preparation",
            description:
              "Select high-quality seeds suitable for the local climate. Seeds should first be sown in nursery trays or prepared seed beds containing fertile soil mixed with compost. Maintain proper moisture and sunlight to ensure healthy germination.",
          },
          {
            title: "Transplanting Seedlings",
            description:
              "After 20–30 days when seedlings develop strong roots and multiple leaves, they can be transplanted to the main field. Maintain proper spacing between plants to allow sunlight and airflow.",
          },
          {
            title: "Fertilization",
            description:
              "Before planting, mix compost or farmyard manure into the soil. Additional fertilizers can be applied during plant growth stages to promote healthy fruit development.",
          },
          {
            title: "Plant Support",
            description:
              "As tomato plants grow, they often require staking or support to prevent branches from touching the soil. Using bamboo sticks or trellises helps improve airflow and fruit quality.",
          },
        ],

        wateringSchedule:
          "Tomato plants require regular and consistent watering throughout their growth period. Water the plants deeply every 2–3 days depending on soil moisture and weather conditions. During hot weather, watering may be required more frequently. Avoid excessive watering because it can lead to root diseases and poor fruit quality.",

        harvestingTips:
          "Tomatoes should be harvested when the fruits develop a bright red color and become firm but slightly soft. Harvest regularly to encourage further fruit production. Gently twist or cut fruits from the stem to avoid damaging the plant.",

        difficulty: "beginner",
        profitMin: "50000",
        profitMax: "120000",

        imageUrl:
          "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },

      {
        name: "Potato",
        nepaliName: "आलु",
        scientificName: "Solanum tuberosum",
        categoryId: categoryMap["Vegetables"],
        description:
          "Potato is one of the most important staple vegetable crops grown across Nepal, especially in hill and mountain regions. It is widely consumed in various dishes and is valued for its high carbohydrate content. Potato farming is relatively easy and can provide reliable income when proper soil preparation and irrigation practices are followed.",

        icon: "🥔",
        climate: "Cool climate",
        soilType: "Sandy loam soil",
        season: "winter",

        nitrogen: "100",
        phosphorus: "60",
        potassium: "120",

        growingGuide: [
          {
            title: "Seed Selection",
            description:
              "Select healthy and disease-free seed potatoes. Medium-sized seed tubers are preferred because they produce stronger plants.",
          },
          {
            title: "Planting",
            description:
              "Cut larger seed potatoes into pieces containing at least one eye and plant them in rows with proper spacing. Ensure the soil is loose and well-drained.",
          },
          {
            title: "Hilling",
            description:
              "As plants grow, soil should be gradually piled around the base of the plant. This process helps protect tubers from sunlight and increases yield.",
          },
          {
            title: "Fertilization",
            description:
              "Apply compost or manure before planting. Additional fertilizers may be added during plant growth to improve tuber development.",
          },
        ],

        wateringSchedule:
          "Potatoes require moderate but consistent watering during their growth stage. Water the field once every 5–7 days depending on rainfall and soil conditions. Avoid overwatering because excessive moisture can cause tuber rot and fungal diseases.",

        harvestingTips:
          "Potatoes are ready for harvest when the plant leaves begin to yellow and dry out. Carefully dig around the plant to remove the tubers without damaging them. After harvesting, allow potatoes to dry in shade before storage.",

        difficulty: "beginner",
        profitMin: "60000",
        profitMax: "150000",

        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg",
      },

      {
        name: "Rice",
        nepaliName: "धान",
        scientificName: "Oryza sativa",
        categoryId: categoryMap["Cereals"],
        description:
          "Rice is the primary staple crop in Nepal and is consumed daily by most households. It is mainly cultivated during the monsoon season in irrigated fields. Rice farming requires proper water management and fertile soil but provides a reliable source of food and income for farmers.",

        icon: "🌾",
        climate: "Warm and humid climate",
        soilType: "Clayey soil",
        season: "monsoon",

        nitrogen: "100",
        phosphorus: "50",
        potassium: "80",

        growingGuide: [
          {
            title: "Nursery Preparation",
            description:
              "Rice seeds are first grown in a nursery bed where seedlings develop strong roots before being transplanted into the main field.",
          },
          {
            title: "Field Preparation",
            description:
              "The main field should be plowed and leveled properly. Water is added to create a muddy field suitable for rice transplantation.",
          },
          {
            title: "Transplanting",
            description:
              "Seedlings are transplanted from the nursery into flooded fields with proper spacing to allow healthy plant growth.",
          },
          {
            title: "Nutrient Management",
            description:
              "Apply fertilizers and organic manure at different stages of plant growth to ensure good grain production.",
          },
        ],

        wateringSchedule:
          "Rice cultivation requires continuous water availability during most stages of growth. Farmers usually maintain shallow standing water in the field until the crop approaches maturity.",

        harvestingTips:
          "Rice is ready for harvest when the grains turn golden yellow and the plants begin to bend slightly. Harvesting should be done carefully using sickles and grains must be dried properly before storage.",

        difficulty: "intermediate",
        profitMin: "80000",
        profitMax: "200000",

        imageUrl:
          "https://images.unsplash.com/photo-1635562985686-4f8bb9c0d3bf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },

      {
        name: "Maize",
        nepaliName: "मकै",
        scientificName: "Zea mays",
        categoryId: categoryMap["Cereals"],
        description:
          "Maize is an important cereal crop grown widely in Nepal, especially in the hilly regions. It is used both as food and animal feed. Maize is relatively easy to grow and can adapt to different climatic conditions, making it popular among farmers.",

        icon: "🌽",
        climate: "Warm climate",
        soilType: "Well-drained fertile soil",
        season: "spring",

        nitrogen: "90",
        phosphorus: "60",
        potassium: "40",

        growingGuide: [
          {
            title: "Land Preparation",
            description:
              "Prepare the field by plowing the soil thoroughly and adding compost or organic manure before planting.",
          },
          {
            title: "Seed Sowing",
            description:
              "Sow maize seeds directly in the field in rows with proper spacing between plants to ensure good growth.",
          },
          {
            title: "Weeding",
            description:
              "Remove weeds regularly during early growth stages to prevent competition for nutrients.",
          },
          {
            title: "Fertilization",
            description:
              "Apply nitrogen fertilizers during plant growth stages to support healthy leaf and cob development.",
          },
        ],

        wateringSchedule:
          "Maize requires moderate watering, especially during germination and flowering stages. Water the crop every 5–7 days depending on rainfall and soil moisture conditions.",

        harvestingTips:
          "Maize is ready to harvest when the husks turn brown and the kernels become hard. Harvest the cobs and dry them properly before storing.",

        difficulty: "beginner",
        profitMin: "40000",
        profitMax: "90000",

        imageUrl:
          "https://images.unsplash.com/photo-1554402100-8d1d9f3dff80?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },

      {
        name: "Chili Pepper",
        nepaliName: "खुर्सानी",
        scientificName: "Capsicum annuum",
        categoryId: categoryMap["Spices"],
        description:
          "Chili pepper is a highly valued spice crop widely used in Nepali cuisine. It is grown in many parts of the country and can be harvested multiple times during a season. Due to strong market demand, chili farming can be profitable when managed properly.",

        icon: "🌶️",
        climate: "Warm climate",
        soilType: "Loamy soil",
        season: "spring",

        nitrogen: "110",
        phosphorus: "70",
        potassium: "140",

        growingGuide: [
          {
            title: "Seed Nursery",
            description:
              "Chili seeds are first grown in nursery beds to develop healthy seedlings before transplanting into the main field.",
          },
          {
            title: "Transplanting",
            description:
              "Seedlings are transplanted into the prepared field with adequate spacing to allow good air circulation.",
          },
          {
            title: "Fertilization",
            description:
              "Apply compost and balanced fertilizers to promote healthy plant growth and fruit development.",
          },
          {
            title: "Pest Management",
            description:
              "Monitor plants regularly for pests such as aphids or mites and apply organic or recommended pest control methods.",
          },
        ],

        wateringSchedule:
          "Chili plants require regular watering but should not be waterlogged. Water the crop two to three times per week depending on soil moisture and weather conditions.",

        harvestingTips:
          "Chili peppers can be harvested when they reach the desired size and color. Harvest regularly to encourage new fruit formation and ensure continuous production.",

        difficulty: "intermediate",
        profitMin: "70000",
        profitMax: "180000",

        imageUrl:
          "https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ]);

    console.log("✅ Seeding completed!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    process.exit(0);
  }
}

seed();
