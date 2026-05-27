import express from "express";
import Topic from "../models/Topic.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.post("/topics", async (req, res, next) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json({ topic });
  } catch (err) {
    next(err);
  }
});

router.patch("/topics/:id", async (req, res, next) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json({ topic });
  } catch (err) {
    next(err);
  }
});

router.delete("/topics/:id", async (req, res, next) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json({ message: "Topic deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
