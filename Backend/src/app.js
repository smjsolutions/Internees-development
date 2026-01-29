const express = require("express");
const cors = require("cors");

// Routes
const serviceRoutes = require("./routes/service.routes"); // Admin routes
const customerServicesRoutes = require("./routes/customerservices"); // Customer routes


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads (for images)
app.use("/uploads", express.static("uploads"));

/* ======================
   Admin API routes
   ====================== */
app.use("/api/services", serviceRoutes);

/* ======================
   Customer API routes
   ====================== */
app.use("/api/customer/services", customerServicesRoutes);



// Test root endpoint
app.get("/", (req, res) => {
  res.send("Backend & Database are running successfully 🚀");
});

module.exports = app;
