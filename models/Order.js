// const Order = require("../models/Order");
// const Product = require("../models/Product");
// // const mongoose = require("mongoose");

// // Create Order (with product reference)
// exports.createOrder = async (req, res) => {
//   const wholesalerId = req.user.id;
//   const { items } = req.body;

//   try {
//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "Order must have at least one item." });
//     }

//     // Optional: validate each product exists
//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         return res.status(400).json({ message: `Product not found: ${item.product}` });
//       }
//     }

//     const order = new Order({
//       wholesalerId,
//       items,
//       status: "Pending",
//     });

//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create order", error: err.message });
//   }
// };

// // Get all orders by a wholesaler (with populated product info)
// exports.getOrdersByUser = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const orders = await Order.find({ wholesalerId: userId })
//       .populate("items.product")
//       .sort({ createdAt: -1 });

//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders", error: err.message });
//   }
// };

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    wholesaler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

