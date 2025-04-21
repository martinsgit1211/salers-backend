const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  wholesaler: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
