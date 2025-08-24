
const express = require("express");
const router = express.Router();
const { login, forgotPassword, resetPassword, register } = require("../controllers/authController");
const { loginInput, forgotPasswordInput, resetPasswordInput, registerInput, verifyToken } = require("../middleware/authMiddleware");


router.post("/login", loginInput, login);
router.post("/forgot-password", forgotPasswordInput, forgotPassword);
router.post("/reset-password", resetPasswordInput, resetPassword);
router.post("/register", registerInput, register);

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Dashboard tạm thời",
    user: req.user
  });
});


module.exports = router;