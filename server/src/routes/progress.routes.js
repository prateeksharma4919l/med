import express from "express";
import Progress from "../models/Progress.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const progress = await Progress.findOneAndUpdate({ user: req.user._id }, {}, { upsert: true, new: true });
    res.json({ progress });
  } catch (err) {
    next(err);
  }
});

router.post("/complete/:topicId", async (req, res, next) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { completedTopics: req.params.topicId } },
      { upsert: true, new: true }
    );
    res.json({ progress });
  } catch (err) {
    next(err);
  }
});

router.delete("/complete/:topicId", async (req, res, next) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { completedTopics: req.params.topicId } },
      { new: true }
    );
    res.json({ progress });
  } catch (err) {
    next(err);
  }
});

router.post("/bookmark/:topicId", async (req, res, next) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { bookmarkedTopics: req.params.topicId } },
      { upsert: true, new: true }
    );
    res.json({ progress });
  } catch (err) {
    next(err);
  }
});

router.delete("/bookmark/:topicId", async (req, res, next) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { bookmarkedTopics: req.params.topicId } },
      { new: true }
    );
    res.json({ progress });
  } catch (err) {
    next(err);
  }
});

router.post("/quiz-score", async (req, res, next) => {
  try {
    const { subjectId, score, total } = req.body;
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id },
      { $push: { quizScores: { subjectId, score, total } } },
      { upsert: true, new: true }
    );
    res.json({ progress });
  } catch (err) {
    next(err);
  }
});

export default router;
