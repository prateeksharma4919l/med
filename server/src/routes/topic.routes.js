import express from "express";
import Topic from "../models/Topic.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { subject, q } = req.query;
    const filter = { isPublished: true };
    if (subject) filter.subjectId = subject;
    if (q) filter.$text = { $search: q };

    const topics = await Topic.find(filter).sort({ subjectId: 1, title: 1 });
    res.json({ topics });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    const topic = isObjectId
      ? await Topic.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] })
      : await Topic.findOne({ slug: req.params.id });
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json({ topic });
  } catch (err) {
    next(err);
  }
});

export default router;
