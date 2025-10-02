const mongoose = require("mongoose");
const password = 'CGMKjM58ii9AXYnB';

async function connectDB() {
  try {

    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(
      `mongodb+srv://ichigomazone:${password}@ichigomazone.phouxpa.mongodb.net/ichigomazone?retryWrites=true&w=majority`,
      {
        serverSelectionTimeoutMS: 30000, 
        socketTimeoutMS: 45000, 
        connectTimeoutMS: 30000, 
      }
    );
    console.log("MongoDB Atlas connected successfully!");
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error);
  }
}

module.exports = connectDB;