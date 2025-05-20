const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../../models/User");

router.post("/register", async (req, res) => {
  const { companyName, email, password } = req.body;

  try {
    const exists = await User.findOne({ email, role: "Admin" });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      companyName,
      email,
      password: hashedPassword,
      role: "Admin",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
