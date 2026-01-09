import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error.message);
  });

// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => {
  res.send("Backend & Database are running successfully 🚀");
});

// ===============================
// Server Port
// ===============================
const PORT = process.env.PORT || 5000;

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
