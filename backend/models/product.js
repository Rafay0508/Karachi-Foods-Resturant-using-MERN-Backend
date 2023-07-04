const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    // unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
  },
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
