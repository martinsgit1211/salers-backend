const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

// /api/auth/register (generic)
router.post("/", registerUser);

// /api/auth/manufacturer/register
router.post("/manufacturer/register", (req, res) => {
  req.body.role = "Manufacturer";
  registerUser(req, res);
});

// /api/auth/manufacturer/login
router.post("/manufacturer/login", (req, res) => {
  req.body.role = "Manufacturer";
  loginUser(req, res);
});

// /api/auth/wholesaler/register
router.post("/wholesaler/register", (req, res) => {
  req.body.role = "Wholesaler";
  registerUser(req, res);
});

// /api/auth/wholesaler/login
router.post("/wholesaler/login", (req, res) => {
  req.body.role = "Wholesaler";
  loginUser(req, res);
});

// /api/auth/logout
router.post("/logout", (req, res) => {
  // This is just a dummy endpoint for frontend logout tracking.
  res.status(200).json({ message: "Logged out successfully" });
});

// DELETE /api/auth/delete
router.delete("/delete", protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;
