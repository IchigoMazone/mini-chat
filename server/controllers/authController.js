const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

// Đường dẫn file JSON
const userFilePath = path.join(__dirname, "../models/Users.json");

// Hàm đọc users
const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
  } catch (err) {
    return [];
  }
};

// Hàm ghi users
const writeUsers = (users) => {
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), "utf-8");
};

const login = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  const tokenJWT = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "7d" } // token hết hạn 7 ngày
  );

  // Trả về client thông tin user + token
  res.json({
    message: "Đăng nhập thành công",
    user: { id: user.id, username: user.username, email: user.email },
    token: tokenJWT
  });
};

const forgotPassword = (req, res) => {
  const { email, phone } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email && u.username === phone);
  if (!user) {
    return res.status(401).json({ message: "Email hoặc tài khoản không chính xác" });
  }

  res.json({ message: "Xác nhận thành công" });
};

const resetPassword = (req, res) => {
  const { phone, email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === phone && u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Không tìm thấy người dùng" });
  }

  user.password = password;
  writeUsers(users); // Lưu lại JSON

  res.json({ message: "Đổi mật khẩu thành công" });
};

const register = (req, res) => {
  const { email, phone, password } = req.body;
  const users = readUsers();

  const existingUser = users.find(u => u.email === email || u.username === phone);
  if (existingUser) {
    return res.status(401).json({ message: "Tài khoản hoặc email đã tồn tại" });
  }

  const newUser = {
    id: users.length + 1,
    username: phone,
    email: email,
    password: password
  };

  users.push(newUser);
  writeUsers(users); // Lưu lại JSON

  console.log("User mới:", newUser);
  res.json({ message: "Đăng ký thành công" });
};

module.exports = { login, forgotPassword, resetPassword, register };
