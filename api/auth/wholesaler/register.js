const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/User");

router.post("/register", async (req, res) => {
  const { companyName, email, password, businessType } = req.body;

  if (!companyName || !email || !password || !businessType) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await User.findOne({ email, role: "Wholesaler" });
    if (existing) {
      return res.status(400).json({ message: "Wholesaler already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      companyName,
      email,
      password: hashedPassword,
      role: "Wholesaler",
      businessType,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Wholesaler registered successfully.",
      token,
      user: {
        id: newUser._id,
        companyName: newUser.companyName,
        email: newUser.email,
        role: newUser.role,
        businessType: newUser.businessType,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
