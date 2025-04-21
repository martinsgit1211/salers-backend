const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.urlencoded({ extended: true }));

// Manufacturer Routes
app.use("/api/manufacturer/register", require("./api/auth/manufacturer/register"));
app.use("/api/auth/manufacturer/login", require("./api/auth/manufacturer/login"));

// Wholesaler Routes
app.use("/api/wholesaler/register", require("./api/auth/wholesaler/register"));
app.use("/api/auth/wholesaler/login", require("./api/auth/wholesaler/login"));

// Static folder to serve uploaded images
app.use("/uploads", express.static("uploads"));

// Mount the route
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
