const express = require("express");
const router = express.Router();
const { getNotifications } = require("../controllers/notificationController");
const { protectManufacturer } = require("../middleware/authMiddleware");

router.get("/", protectManufacturer, getNotifications);

module.exports = router;
