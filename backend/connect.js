
const mongoose = require("mongoose");
const password = 'CGMKjM58ii9AXYnB';

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://ichigomazone:${password}@ichigomazone.phouxpa.mongodb.net/`, 
    );
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = connectDB;
