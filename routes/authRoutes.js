const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// /api/auth/register (generic)
router.post("/", registerUser);

// /api/auth/manufacturer/register
router.post("/manufacturer/register", (req, res) => {
  req.body.role = "manufacturer";
  registerUser(req, res);
});

// /api/auth/manufacturer/login
router.post("/manufacturer/login", (req, res) => {
  req.body.role = "manufacturer";
  loginUser(req, res);
});

// /api/auth/wholesaler/register
router.post("/wholesaler/register", (req, res) => {
  req.body.role = "Wholesaler";
  registerUser(req, res);
});

// /api/auth/wholesaler/login
router.post("/wholesaler/login", (req, res) => {
  req.body.role = "wholesaler";
  loginUser(req, res);
});

module.exports = router;
