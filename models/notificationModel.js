const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
