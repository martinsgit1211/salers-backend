const express = require("express");
const router = express.Router();
const { createOrder, getOrdersByUser } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, getOrdersByUser);

module.exports = router;
