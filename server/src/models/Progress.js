import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    completedTopics: [{ type: String }],
    bookmarkedTopics: [{ type: String }],
    quizScores: [
      {
        subjectId: String,
        score: Number,
        total: Number,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    studyMinutes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
