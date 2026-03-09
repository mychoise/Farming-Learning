import express from "express";
import { body } from "express-validator";
import { getMyWeather } from "../controllers/weather.controller.js";

const weatherRouter = express.Router();

const weatherValidation = [
    body("latitude").isFloat(),
    body("longitude").isFloat()
]

weatherRouter.post("/my-weather", weatherValidation, getMyWeather);

export default weatherRouter;