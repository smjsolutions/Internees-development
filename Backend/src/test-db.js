const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log("Connection String:", process.env.MONGO_URI);

    // Remove deprecated options
    await mongoose.connect(process.env.MONGO_URI);

    console.log("\n✅ MongoDB Connected Successfully!");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
    console.log("🖥️  Host:", mongoose.connection.host);
    console.log("🔌 Port:", mongoose.connection.port);

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "\n📁 Collections:",
      collections.length > 0
        ? collections.map((c) => c.name)
        : "No collections yet"
    );

    await mongoose.connection.close();
    console.log("\n✅ Connection closed successfully");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

testConnection();
