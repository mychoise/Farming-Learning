import express from "express";
import { animalWeightCalculation, organicFertilizerCalculator, unitConversion,InorganicFertilizerCalculator } from "../controllers/calclation.controller.js";

const calculationRouter = express.Router();

calculationRouter.post("/unit-conversion", unitConversion);
calculationRouter.post("/organic-fertilizer",organicFertilizerCalculator)
calculationRouter.post("/inorganic-fertilizer",InorganicFertilizerCalculator)
calculationRouter.post("/animal-weight",animalWeightCalculation)

export default calculationRouter;