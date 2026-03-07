import express from "express";
import {
  addCrop,
  getAllcrop,
  getSpecificCrop,
} from "../controllers/crop.controller.js";
import { body } from "express-validator";
import { auth } from "./../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import upload from "./../config/Image.config.js";
const cropRouter = express.Router();

const addCropValidator = [
  // Required
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("categoryName").notEmpty().withMessage("Category is required"),
  body("nitrogen")
    .notEmpty()
    .withMessage("Nitrogen is required")
    .isNumeric()
    .withMessage("Nitrogen must be a number")
    .custom((val) => val >= 0)
    .withMessage("Nitrogen must be positive"),
  body("phosphorus")
    .notEmpty()
    .withMessage("Phosphorus is required")
    .isNumeric()
    .withMessage("Phosphorus must be a number")
    .custom((val) => val >= 0)
    .withMessage("Phosphorus must be positive"),
  body("potassium")
    .notEmpty()
    .withMessage("Potassium is required")
    .isNumeric()
    .withMessage("Potassium must be a number")
    .custom((val) => val >= 0)
    .withMessage("Potassium must be positive"),

  // Optional but validated if provided
  body("profitMin")
    .optional()
    .isNumeric()
    .withMessage("Profit min must be a number")
    .custom((val) => val >= 0)
    .withMessage("Profit min must be positive"),
  body("profitMax")
    .optional()
    .isNumeric()
    .withMessage("Profit max must be a number")
    .custom((val) => val >= 0)
    .withMessage("Profit max must be positive"),
  body("difficulty")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Difficulty must be beginner, intermediate or advanced"),
  body("season")
    .optional()
    .isIn(["spring", "monsoon", "winter", "all"])
    .withMessage("Season must be spring, monsoon, winter or all"),
];

cropRouter.get("/all", getAllcrop);
cropRouter.post(
  "/add",
  addCropValidator,
  auth,
  upload.single("image"),
  admin,
  addCrop,
);
cropRouter.get("/crop/:id", getSpecificCrop);

export default cropRouter;
