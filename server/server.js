import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cropRouter from "./routes/crop.route.js";
import aiRouter from "./routes/ai.route.js";
import newsRouter from "./routes/notice.route.js";
import videoRouter from "./routes/video.route.js";
import calculationRouter from "./routes/calculation.route.js";
import weatherRouter from "./routes/weather.route.js";
import postRouter from "./routes/post.route.js";
import cropCalenderRouter from "./routes/cropcalender.route.js";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/crop", cropRouter);
app.use("/api/ai", aiRouter);
app.use("/api/notices", newsRouter);
app.use("/api/video", videoRouter);
app.use("/api/calculate", calculationRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/post", postRouter);
app.use("/api/cropcalender", cropCalenderRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
