const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/mydatabase"; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
