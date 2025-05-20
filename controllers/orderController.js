const Order = require("../models/Order");
const Product = require("../models/Product");
const Notification = require("../models/notificationModel");
const sendEmail = require("../utils/sendEmail");

// POST /api/orders - Create new order
const createOrder = async (req, res) => {
  const wholesalerId = req.user._id;
  const { items } = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must have at least one item." });
    }

    let total = 0;
    const manufacturerNotifications = [];

    for (const item of items) {
      const product = await Product.findById(item.product).populate("manufacturer", "companyName email");
      
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product}` });
      }

      total += product.price * item.quantity;

      manufacturerNotifications.push({
        manufacturerId: product.manufacturer._id,
        email: product.manufacturer.email,
        message: `Your product "${product.name}" was ordered by a wholesaler.`,
      });
    }

    const order = new Order({
      wholesaler: wholesalerId,
      items,
      total,
      status: "Pending",
    });

    await order.save();
    const populatedOrder = await order.populate("items.product", "name price");

    // ✅ Loop through and save notifications and send emails
    for (const note of manufacturerNotifications) {
      await Notification.create({
        manufacturer: note.manufacturerId,
        message: note.message,
      });

      await sendEmail(note.email, "New Product Order", note.message);
    }

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error("Create order error:", err.message);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};
  

// GET /api/orders/my - Get all orders for the logged-in wholesaler
const getOrdersByUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ wholesaler: userId })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err.message);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// GET /api/orders/stats
const getOrderStatsForWholesaler = async (req, res) => {
    const wholesalerId = req.user._id;
  
    try {
      const orders = await Order.find({ wholesaler: wholesalerId });
  
      const orderCount = orders.length;
      const pendingCount = orders.filter(order => order.status === "Pending").length;
      const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  
      res.json({ orderCount, pendingCount, totalSales });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch stats", error: err.message });
    }
  };
  
  module.exports = {
    createOrder,
    getOrdersByUser,
    getOrderStatsForWholesaler,
  };