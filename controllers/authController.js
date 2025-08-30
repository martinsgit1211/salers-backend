const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// In-memory token blacklist (optional for demo)
let blacklistedTokens = [];

// Register user
const registerUser = async (req, res) => {
  // const { name, email, password, role } = req.body;
  const { companyName, email, password, role, businessType } = req.body;

 if (!companyName || !email || !password || !role) {
  return res.status(400).json({ message: "All fields are required" });
}

  try {
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({ message: `${role} already exists with this email` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({ name, email, password: hashedPassword, role });
    const user = new User({
  companyName,
  email,
  password: hashedPassword,
  role,
  businessType,
});
    await user.save();

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({ message: `${role} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout user
const logoutUser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    blacklistedTokens.push(token);
    return res.status(200).json({ message: "Logout successful" });
  }
  res.status(400).json({ message: "No token provided" });
};

// Middleware (optional): block blacklisted tokens
const checkBlacklistedToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (blacklistedTokens.includes(token)) {
    return res.status(401).json({ message: "Token has been logged out" });
  }
  next();
};

module.exports = { registerUser, loginUser, logoutUser, checkBlacklistedToken };
