import express from "express";
import { getMyWeather } from "../controllers/weather.controller.js";

const weatherRouter = express.Router();

weatherRouter.post("/my-weather", getMyWeather);

export default weatherRouter;