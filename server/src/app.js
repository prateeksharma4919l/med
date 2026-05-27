import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import topicRoutes from "./routes/topic.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

app.get("/api/health", (req, res) => res.json({ ok: true, name: "MedEase AI API" }));
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
