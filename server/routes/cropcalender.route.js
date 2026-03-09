import express from "express";
import {
  getCropCalender,
  makeCropCalender,
  deleteCropCalender,
} from "../controllers/cropcalender.controller.js";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
const cropCalenderRouter = express.Router();

cropCalenderRouter.get("/get", auth, getCropCalender);
cropCalenderRouter.post("/add", auth, admin, makeCropCalender);
cropCalenderRouter.delete("/delete", auth, admin, deleteCropCalender);

export default cropCalenderRouter;
