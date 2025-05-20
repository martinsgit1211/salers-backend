const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductCount,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

// GET /api/products - Get all products (protected)
router.get("/", protect, getProducts);

// POST /api/products/add - Add product with image (protected)
router.post("/add", protect, upload.single("image"), addProduct);

// GET /api/products/count - Get product count (protected)
router.get("/count", protect, getProductCount);

// DELETE /api/products/:id - Delete product by ID (protected)
router.delete("/:id", protect, deleteProduct);

module.exports = router;
