// view.js
const connectDB = require('./connectDB'); // Bỏ dấu {}
const mongoose = require('mongoose');
const User = require('./userModel');

async function viewUsers() {
  try {
    await connectDB();
    
    const users = await User.find();
    console.log('Users:', users);
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

viewUsers();