const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require('../utils/upload'); // Import the multer upload configuration

// Add product route with image upload
router.get("/", protect, getProducts); // Get all products route
router.post("/add", protect, upload.single('image'), addProduct);

module.exports = router;
