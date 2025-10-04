
require("dotenv").config();
const mongoose = require("mongoose");


async function connectDB() {
  try {

    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(
      `mongodb+srv://${process.env.USER_KEY_MONGODB}:${process.env.PASS_KEY_MONGODB}@ichigomazone.phouxpa.mongodb.net/ichigomazone?retryWrites=true&w=majority`,
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