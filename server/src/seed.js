import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDb } from "./lib/db.js";
import Topic from "./models/Topic.js";
import User from "./models/User.js";
import Progress from "./models/Progress.js";
import { seedTopics } from "./data/seedTopics.js";

dotenv.config();

async function seed() {
  await connectDb();
  await Topic.deleteMany({});
  await Topic.insertMany(seedTopics);

  const adminEmail = "admin@medease.ai";
  const password = await bcrypt.hash("admin123", 12);
  const admin = await User.findOneAndUpdate(
    { email: adminEmail },
    { name: "MedEase Admin", email: adminEmail, password, role: "admin" },
    { upsert: true, new: true }
  );
  await Progress.findOneAndUpdate({ user: admin._id }, {}, { upsert: true });

  console.log(`Seeded ${seedTopics.length} topics`);
  console.log("Admin login: admin@medease.ai / admin123");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
