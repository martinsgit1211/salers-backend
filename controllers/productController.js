const path = require('path');
const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    // console.log('BODY:', req.body);
    // console.log('FILE:', req.file);
    // console.log('USER:', req.user);

    const { name, description, price, stock } = req.body;
    const manufacturerId = req.user?.id;

    if (!name || !price || !stock) {
      return res.status(400).json({ message: 'Name, price, and stock are required.' });
    }

    // const image = req.file ? path.join('uploads/products', req.file.filename) : null;
    const image = req.file
  ? `${req.protocol}://${req.get("host")}/uploads/products/${req.file.filename}`
  : null;


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
// const getProducts = async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.status(200).json(products);
//     } catch (error) {
//       console.error('Get Products Error:', error.message);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   };
  
  const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const formattedProducts = products.map(product => {
      const isFullUrl = product.image?.startsWith("http");
      return {
        ...product._doc,
        image: isFullUrl
          ? product.image
          : `${req.protocol}://${req.get("host")}/${product.image}`,
      };
    });

    res.status(200).json(formattedProducts);
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
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;  // The product id from the URL
      
      // Find the product and delete it
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };

module.exports = {
  addProduct,
  getProducts,
  getProductCount,
  deleteProduct
};
