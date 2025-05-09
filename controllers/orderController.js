const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const wholesalerId = req.user.id;
  const { items } = req.body;

  try {
    const order = new Order({ wholesalerId, items });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ wholesalerId: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
