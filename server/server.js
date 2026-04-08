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
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import {rateLimit} from "express-rate-limit";
import { initSocket } from "./config/socket.js";
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
})
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 8, // Limit each IP to 8 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})

const aiLimiter = rateLimit({
    windowMs: 60 * 1000,        // 1 minute
    limit: 8,                   // Max 8 AI requests per minute (protects Ollama + Gemini cost)
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        error: "AI usage limit reached. Please wait a moment before trying again.",
    },
});

initSocket(io)

app.use(
    helmet({
        contentSecurityPolicy: false,           // Safe for API
        crossOriginEmbedderPolicy: false,       // Important when frontend & backend are on different domains
        crossOriginOpenerPolicy: { policy: "same-origin" },
        hidePoweredBy: true,
        xssFilter: true,
        noSniff: true,
        referrerPolicy: { policy: "strict-origin-when-cross-origin" },
        originAgentCluster: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(limiter);


app.get("/", (req, res) => {
  res.send("Server is running");
});


app.use("/api/auth", authRouter);
app.use("/api/crop", cropRouter);
app.use("/api/ai", aiLimiter,aiRouter);
app.use("/api/notices", newsRouter);
app.use("/api/video", videoRouter);
app.use("/api/calculate", calculationRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/post", postRouter);
app.use("/api/cropcalender", cropCalenderRouter);

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
