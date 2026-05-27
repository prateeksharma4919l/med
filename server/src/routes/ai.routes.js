import express from "express";
import { z } from "zod";
import { askAi, makeStudyPlan } from "../services/ai.service.js";

const router = express.Router();

router.post("/chat", async (req, res, next) => {
  try {
    const schema = z.object({
      prompt: z.string().min(2),
      history: z.array(z.object({ role: z.string(), content: z.string() })).optional()
    });
    const payload = schema.parse(req.body);
    const answer = await askAi(payload.prompt, payload.history || []);
    res.json({ answer });
  } catch (err) {
    next(err);
  }
});

router.post("/generate-notes", async (req, res, next) => {
  try {
    const { topic, mode = "short notes" } = req.body;
    const notes = await askAi(`Generate ${mode} for ${topic} with exam points, viva, mnemonic and summary.`);
    res.json({ notes });
  } catch (err) {
    next(err);
  }
});

router.post("/generate-mcqs", async (req, res, next) => {
  try {
    const { topic, count = 10 } = req.body;
    const mcqs = await askAi(`Generate ${count} MBBS 2nd year MCQs on ${topic}. Include options, answer and explanation.`);
    res.json({ mcqs });
  } catch (err) {
    next(err);
  }
});

router.post("/study-plan", async (req, res, next) => {
  try {
    const plan = await makeStudyPlan(req.body);
    res.json({ plan });
  } catch (err) {
    next(err);
  }
});

export default router;
