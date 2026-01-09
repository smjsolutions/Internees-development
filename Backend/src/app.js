import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/service.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", serviceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend & Database are running successfully 🚀");
});

export default app;
