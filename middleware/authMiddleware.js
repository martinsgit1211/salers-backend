const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// 👇 Add this function to fix the error
const protectWholesaler = (req, res, next) => {
  if (req.user?.role !== 'Wholesaler') {
    return res.status(403).json({ message: 'Access denied: Not a wholesaler' });
  }
  next();
};
const protectManufacturer = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user || user.role !== "Manufacturer") {
        return res.status(401).json({ message: "Not authorized as manufacturer" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Auth error:", err.message);
      return res.status(401).json({ message: "Token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ✅ Export both functions
module.exports = {
  protect,
  protectWholesaler,
  protectManufacturer,
};
