const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      const token = generateToken(user);
      res.status(201).json({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token 
      });
      
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid email or password" });
  
      const token = generateToken(user);
      res.status(200).json({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token 
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = { register, login };