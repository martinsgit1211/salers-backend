const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getProductCount, deleteProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require('../utils/upload');

// Add product route with image upload
router.get("/", protect, getProducts);
router.post("/add", protect, upload.single('image'), addProduct);
router.get('/count', protect, getProductCount);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
