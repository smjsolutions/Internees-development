import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/service.routes.js";       // Admin routes
import customerServicesRoutes from "./routes/customerservices.js"; // Customer routes

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads (for images)
app.use("/uploads", express.static("uploads"));

// =======================
// Admin API routes
// =======================
app.use("/api", serviceRoutes);  // Full CRUD for admin

// =======================
// Customer API routes
// =======================
app.use("/services", customerServicesRoutes); // Read-only APIs for customers

// Test root endpoint
app.get("/", (req, res) => {
  res.send("Backend & Database are running successfully 🚀");
});

export default app;
