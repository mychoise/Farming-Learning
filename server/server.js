import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
