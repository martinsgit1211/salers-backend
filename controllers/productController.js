const path = require('path');
const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    console.log('USER:', req.user);

    const { name, description, price, stock } = req.body;
    const manufacturerId = req.user?.id;

    if (!name || !price || !stock) {
      return res.status(400).json({ message: 'Name, price, and stock are required.' });
    }

    const image = req.file ? path.join('uploads/products', req.file.filename) : null;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      image,
      manufacturer: manufacturerId,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Add Product Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error('Get Products Error:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

const getProductCount = async (req, res) => {
    try {
      const count = await Product.countDocuments(); // Count the number of products in the database
      res.json({ count });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };

module.exports = {
  addProduct,
  getProducts,
  getProductCount
};
