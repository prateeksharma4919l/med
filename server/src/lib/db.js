import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI missing. API will start only after a MongoDB URI is added.");
    return;
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
