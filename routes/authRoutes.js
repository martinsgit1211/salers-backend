const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

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


module.exports = router;
