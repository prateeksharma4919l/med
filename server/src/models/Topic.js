import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema(
  {
    question: String,
    options: [String],
    answer: String,
    explanation: String
  },
  { _id: false }
);

const topicSchema = new mongoose.Schema(
  {
    subjectId: { type: String, required: true, index: true },
    subjectName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    difficulty: String,
    duration: Number,
    definition: String,
    causes: [String],
    pathogenesis: [String],
    morphology: String,
    clinicalFeatures: [String],
    diagnosis: [String],
    examPoints: [String],
    viva: [String],
    mnemonics: [String],
    mcqs: [mcqSchema],
    flowchart: [String],
    diagram: String,
    pyqs: [String],
    summary: String,
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

topicSchema.index({ title: "text", summary: "text", subjectName: "text" });

export default mongoose.model("Topic", topicSchema);
