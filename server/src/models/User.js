import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    examDate: Date,
    streak: { type: Number, default: 0 },
    lastStudyDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
