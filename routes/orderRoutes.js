const express = require("express");
const router = express.Router();

const { createOrder, getOrdersByUser, getOrderStatsForWholesaler} = require("../controllers/orderController");
const { protect, protectWholesaler} = require("../middleware/authMiddleware");

// POST /api/orders - Create order (for logged-in wholesaler)
router.post("/", protect, protectWholesaler, createOrder);

// GET /api/orders/my - Get all orders for the logged-in wholesaler
router.get("/my", protect, protectWholesaler, getOrdersByUser);

router.get("/stats", protect, getOrderStatsForWholesaler)

// PATCH route for manufacturers to update order status
// router.put("/:id/status", protect, protectManufacturer, updateOrderStatus);

module.exports = router;
