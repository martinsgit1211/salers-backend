const multer = require('multer');
const path = require('path');

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/'); // Set destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name as current timestamp + original extension
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Allow image files
  } else {
    cb(new Error('Not an image file'), false); // Reject non-image files
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
