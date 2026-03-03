import express from "express";
import {
  addCrop,
  getAllcrop,
  getSpecificCrop,
} from "../controllers/crop.controller.js";
import { body } from "express-validator";
import { auth } from "./../middleware/auth.js";
import { admin } from "../middleware/admin.js";
const cropRouter = express.Router();

const addCropValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("nitrogen").notEmpty().withMessage("Nitrogen is required"),
  body("phosphorus").notEmpty().withMessage("Phosphorus is required"),
  body("potassium").notEmpty().withMessage("Potassium is required"),
  body("estimatedProfit")
    .notEmpty()
    .withMessage("Estimated profit is required"),
];

cropRouter.get("/all", getAllcrop);
cropRouter.post("/add", addCropValidator, auth, admin, addCrop);
cropRouter.get("/crop/:id", getSpecificCrop);

export default cropRouter;
