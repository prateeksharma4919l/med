import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/User.js";
import Progress from "../models/Progress.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, streak: user.streak, examDate: user.examDate };
}

router.post("/register", async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: payload.email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const password = await bcrypt.hash(payload.password, 12);
    const user = await User.create({ ...payload, password });
    await Progress.create({ user: user._id });

    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(payload.password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

export default router;
