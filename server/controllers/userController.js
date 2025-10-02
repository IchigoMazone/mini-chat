
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");


const userFilePath = path.join(__dirname, "../models/Users.json");

// Hàm đọc users
const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
  } catch (err) {
    return [];
  }
};

// const uuidFunction = (req, res) => {
//     const { username } = req.body;
//     const users = readUsers() || [];

//     const user = users.find(u => u.username == username);
//     res.json({ 
//         message: "Thanh Cong",
//         userId: user.id,
//     })
// };

const User = require("../models/userModel");
const connectDB = require("../models/connectDB");
const  mongoose = require("mongoose");

const uuidFunction = async (req, res) => {
  const { username } = req.body;

  await connectDB ();

  const user = await User.findOne ({ username });

  res.json({ message: "Thanh Cong", userId: user.id });

};

// const uuidFunction1 = (req, res) => {
//   const { datax } = req.body; // datax = userId
//   const users = readUsers(); // array of users

//   const user = users.find(u => u.id === datax);
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // destructuring để loại bỏ email và createdAt
//   const { email, createdAt, ...userInfo } = user;

//   res.json({ 
//     message: "Success",
//     userInfo
//   });
// };

const uuidFunction1 = async (req, res) => {
  const { datax } = req.body;

  //await connectDB ();
  const user = await User.findOne ({ 
    _id: new mongoose.Types.ObjectId (datax)
   });

   if (!user) {
    return res.status(404).json ({
      message: "User not found"
    });
   }

   const { email, createAt, ...userInfo } = user;
   res.json ({
    message: "Success",
    userInfo
   });
};

// const uuidFunction2 = (req, res) => {
//   const { data } = req.body;
//   const users = readUsers();

//   const user = users.find(u => u.id === data);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json({
//     message: "Success",
//     avatar: user.avatar,
//     fullname: user.fullname,
//     gender: user.gender
//   });
// };

const uuidFunction2 = async (req, res) => {
  const { data } = req.body;

  const user = await User.findOne({
    _id: new mongoose.Types.ObjectId (data)
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log(user)

  res.json({
    message: "Success",
    avatar: user.avatar,
    fullname: user.fullname,
    gender: user.gender
  });
}

module.exports = {
    uuidFunction,
    uuidFunction1,
    uuidFunction2
}