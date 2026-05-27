import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./lib/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`MedEase AI API running on port ${port}`);
  });
});
