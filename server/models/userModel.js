const mongoose = require("mongoose");

// Định nghĩa Schema KHÔNG có trường id tùy chỉnh
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  fullname: { type: String },
  gender: { type: String },
  birthday: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Tạo model
const User = mongoose.model("User", userSchema);

module.exports = User;