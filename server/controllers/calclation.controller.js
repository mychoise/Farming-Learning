import {db} from "../db.config.js"
import { cropTable } from "../db/schema/crop.js";
import {eq} from "drizzle-orm";
import { organicFertilizerTable } from "../db/schema/fertilizers.js";
import { INORGANIC_FERTILIZERS } from "../constants/fertilizer.constant.js";
import { animalCalculate } from "../db/schema/animalCalculator.js";

export const organicFertilizerCalculator = async (req, res) => {
  try {
    const { cropName, SystemOfLandCalculation, length, wide } = req.body;

    if (!cropName || !SystemOfLandCalculation || !length || !wide) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const lengthNum = Number(length);
    const wideNum = Number(wide);

    const [crop] = await db
      .select({
        N: cropTable.nitrogen,
        P: cropTable.phosphorus,
        K: cropTable.potassium,
      })
      .from(cropTable)
      .where(eq(cropTable.name, cropName));

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    const organicFertilizers = await db.select().from(organicFertilizerTable);

    if (!organicFertilizers.length) {
      return res.status(404).json({ message: "No fertilizers found" });
    }

    let areaInHectare = 0;

    if (SystemOfLandCalculation === "Bigha") {
      const kattha = lengthNum * 20 + wideNum;
      areaInHectare = kattha * 0.033863;
    }

    if (SystemOfLandCalculation === "Ropani") {
      const aana = lengthNum * 16 + wideNum;
      areaInHectare = aana * 0.00318;
    }

    if (!areaInHectare) {
      return res.status(400).json({ message: "Invalid SystemOfLandCalculation" });
    }

    const N_needed = parseFloat(crop.N) * areaInHectare;
    const P_needed = parseFloat(crop.P) * areaInHectare;
    const K_needed = parseFloat(crop.K) * areaInHectare;

    const fertilizerResults = organicFertilizers.reduce((acc, f) => {

      const nPercent = parseFloat(f.nitrogen);

      if (!nPercent) {
        acc[f.name] = 0;
        return acc;
      }

      const amountKg = N_needed / (nPercent / 100);

      acc[f.name] = parseFloat(amountKg.toFixed(2));

      return acc;

    }, {});

    return res.status(200).json({
      success: true,
      data: {
        crop: cropName,
        areaInHectare: parseFloat(areaInHectare.toFixed(4)),
        nutrientsNeeded: {
          N_kg: parseFloat(N_needed.toFixed(2)),
          P_kg: parseFloat(P_needed.toFixed(2)),
          K_kg: parseFloat(K_needed.toFixed(2)),
        },
        fertilizers: fertilizerResults,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const InorganicFertilizerCalculator = async (req, res) => {
  try {
    const { cropName, SystemOfLandCalculation, length, wide } = req.body;

    if (!cropName || !SystemOfLandCalculation || !length || !wide) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const lengthNum = Number(length);
    const wideNum = Number(wide);

    const [crop] = await db
      .select({
        N: cropTable.nitrogen,
        P: cropTable.phosphorus,
        K: cropTable.potassium,
      })
      .from(cropTable)
      .where(eq(cropTable.name, cropName));

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    let areaInHectare = 0;

    if (SystemOfLandCalculation === "Bigha") {
      const kattha = lengthNum * 20 + wideNum;
      areaInHectare = kattha * 0.033863;
    }

    if (SystemOfLandCalculation === "Ropani") {
      const aana = lengthNum * 16 + wideNum;
      areaInHectare = aana * 0.00318;
    }

    if (!areaInHectare) {
      return res.status(400).json({ message: "Invalid SystemOfLandCalculation" });
    }

    const N_needed = parseFloat(crop.N) * areaInHectare;
    const P_needed = parseFloat(crop.P) * areaInHectare;
    const K_needed = parseFloat(crop.K) * areaInHectare;

    // Standard fertilizer composition
    const UREA_N = 0.46;
    const DAP_N = 0.18;
    const DAP_P = 0.46;
    const MOP_K = 0.60;

    // Step 1: Phosphorus from DAP
    const dapKg = P_needed / DAP_P;

    // Step 2: Potassium from MOP
    const mopKg = K_needed / MOP_K;

    // Step 3: Nitrogen contribution from DAP
    const nitrogenFromDAP = dapKg * DAP_N;

    const remainingN = N_needed - nitrogenFromDAP;

    const ureaKg = remainingN > 0 ? remainingN / UREA_N : 0;

    const fertilizerResults = {
      Urea: parseFloat(ureaKg.toFixed(2)),
      DAP: parseFloat(dapKg.toFixed(2)),
      MOP: parseFloat(mopKg.toFixed(2)),
    };

    return res.status(200).json({
      success: true,
      data: {
        crop: cropName,
        areaInHectare: parseFloat(areaInHectare.toFixed(4)),
        nutrientsNeeded: {
          N_kg: parseFloat(N_needed.toFixed(2)),
          P_kg: parseFloat(P_needed.toFixed(2)),
          K_kg: parseFloat(K_needed.toFixed(2)),
        },
        fertilizers: fertilizerResults,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const animalWeightCalculation = async (req, res) => {
  try {
    const {animalName , HeartGrith , BodyLength} = req.body;
    
    if (!animalName || !HeartGrith || !BodyLength) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const [animal] = await db.select().from(animalCalculate).where(eq(animalCalculate.name, animalName));
    if (!animal) {
      return res.status(404).json({ success: false, message: "Animal not found" });
    }

    const weight = ((HeartGrith * HeartGrith) * BodyLength) / parseInt(animal.constant);

    return res.status(200).json({
      success: true,
      data: {
        animalName,
        HeartGrith,
        BodyLength,
        weight: parseFloat(weight.toFixed(2)),
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const unitConversion = async (req, res) => {
  try {
    let { currentUnit, firstValue, targetUnit } = req.body;

    if (!currentUnit || !firstValue || !targetUnit) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (firstValue <= 0) {
      return res.status(400).json({
        success: false,
        message: "Values must be greater than 0",
      });
    }

    const units = {
      Ropani: 508.72,
      Aana: 31.80,
      Bigha: 6772.63,
      Katha: 338.63,
      Acre: 4046.86,
      "Sq.ft": 0.092903,
      "Sq.m": 1,
      Hectare: 10000,
    };

    if (!units[currentUnit] || !units[targetUnit]) {
      return res.status(400).json({
        success: false,
        message: "Invalid unit",
      });
    }

    // Convert to square meter first
    const valueInSqMeter = firstValue * units[currentUnit];

    // Convert to target unit
    const convertedValue = valueInSqMeter / units[targetUnit];

    res.status(200).json({
      success: true,
      result: convertedValue,
      unit: targetUnit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};