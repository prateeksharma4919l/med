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
  username: z.string().min(2).optional(),
  password: z.string().min(4)
});

const loginSchema = z.object({
  identifier: z.string().min(2),
  password: z.string().min(4)
});

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, streak: user.streak, examDate: user.examDate };
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.post("/register", async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const username = payload.username || payload.name.toLowerCase();
    const exists = await User.findOne({ $or: [{ email: payload.email }, { username }] });
    if (exists) return res.status(409).json({ message: "Email or username already registered" });

    const password = await bcrypt.hash(payload.password, 12);
    const user = await User.create({ ...payload, username, password });
    await Progress.create({ user: user._id });

    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const identifier = payload.identifier.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }, { name: new RegExp(`^${escapeRegex(identifier)}$`, "i") }]
    });
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
