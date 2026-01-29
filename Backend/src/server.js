const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");

// 🔹 IMPORT ROUTES
const serviceRoutes = require("./routes/service.routes");
const customerServicesRoutes = require("./routes/customerservices");
const authRoutes = require("./routes/authRoutes"); // path to your auth routes file
const galleryRoutes = require("./routes/adminGalleryRoutes");
const CustomerGalleryRoutes=require("./routes/customerGalleryRoutes")
const packageRoutes = require("./routes/packageRoutes");
const adminUsersRoutes = require("./routes/adminUsers.routes");
const adminAuthRoutes = require("./routes/adminAuth.routes");


const app = express();

// 🔹 Connect DB
connectDB();

// 🔹 Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// 🔹 Static uploads (images)
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static("uploads")
);

// 🔹 Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

/* =========================
   🔹 ADMIN ROUTES
   ========================= */
app.use("/api/services", serviceRoutes);       // Services (Admin)
app.use("/api/packages", packageRoutes);       // ✅ Packages (Admin)
app.use("/api/admin/auth", adminAuthRoutes);   // Admin login
app.use("/api/admin", adminUsersRoutes);       // Admin users CRUD
/* =========================
   🔹 CUSTOMER ROUTES
   ========================= */
app.use("/api/customer/services", customerServicesRoutes);

/* =========================
   🔹 AUTH ROUTES
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);

app.use("/api/gallery/Customer", CustomerGalleryRoutes);

// 🔹 Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
