import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import env from "./src/config/env.js";
import authRoutes from "./src/routes/auth.routes.js";
import postRoutes from "./src/routes/posts.routes.js";
import commentRoutes from "./src/routes/comments.routes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, uptime: process.uptime() })
);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

export default app;
