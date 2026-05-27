import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri || !/^mongodb(\+srv)?:\/\//.test(uri)) {
    console.warn('MONGODB_URI missing or invalid. Add a value starting with "mongodb://" or "mongodb+srv://" to enable database features.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.warn(`MongoDB connection failed: ${err.message}`);
    console.warn("API is starting without database features so the demo site can still run.");
  }
}
