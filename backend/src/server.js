import dotenv from "dotenv";
dotenv.config(); // Runs synchronously first

// Use dynamic import so this is evaluated AFTER dotenv runs
const { default: app } = await import("./app.js");
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});