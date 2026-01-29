const bcrypt = require("bcryptjs");

require("dotenv").config();
const connectDB = require("./src/config/db");
const AdminUser = require("./src/models/adminUser.model.js");

async function createAdmin() {
  await connectDB(); // Connect to MongoDB

  // Check if admin already exists
  const exists = await AdminUser.findOne({ role: "ADMIN" });
  if (exists) {
    console.log("❌ Admin already exists");
    process.exit(0);
  }

  // Hash the password
  const password_hash = await bcrypt.hash("Admin@123", 12);

  // Create admin
  await AdminUser.create({
      username: "superadmin",
    name: "Super Admin",
     username: "superadmin",
    email: "admin@example.com",
    password_hash,
    role: "ADMIN",
    status: "ACTIVE",
  });

  console.log("✅ First Admin created!");
  console.log("Email: admin@example.com");
  console.log("Password: Admin@123");

  process.exit(0);
}

createAdmin();
