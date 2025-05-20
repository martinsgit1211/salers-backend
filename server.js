const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const profileRoutes = require("./routes/profileRoutes")

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes (combined handler for login/register if you want)
app.use("/api/auth", authRoutes);

// Manufacturer Routes
app.use("/api/manufacturer/register", require("./api/auth/manufacturer/register"));
app.use("/api/auth/manufacturer/login", require("./api/auth/manufacturer/login"));

// Wholesaler Routes
app.use("/api/wholesaler/register", require("./api/auth/wholesaler/register"));
app.use("/api/auth/wholesaler/login", require("./api/auth/wholesaler/login"));

// Static file access
app.use("/uploads", express.static("uploads"));

// Main API routes
app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/api/profile", profileRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
