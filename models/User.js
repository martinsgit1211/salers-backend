const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true }, // formerly 'name'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Manufacturer", "Wholesaler", "Admin"],
      required: true,
    },
    businessType: { type: String }, // required for wholesalers (check in controller)
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
