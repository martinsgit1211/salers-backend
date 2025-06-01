const Notification = require("../models/notificationModel");

// @desc    Get notifications for the logged-in manufacturer
// @route   GET /api/notifications
// @access  Private (Manufacturer only)
const getNotifications = async (req, res) => {
  try {
    const manufacturerId = req.user._id
    const notifications = await Notification.find({ manufacturer: manufacturerId })
    .populate("orderId", "status")
    .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err.message);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};
module.exports = { getNotifications }