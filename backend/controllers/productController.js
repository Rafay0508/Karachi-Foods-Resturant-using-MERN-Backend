const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { title, description, category, isPopular, price, picture } =
      req.body;

    // Create a new product object
    const newProduct = new Product({
      title,
      description,
      category,
      isPopular,
      price,
      picture,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product", error: error });
  }
};

const getAllProduct = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by its ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = { addProduct, deleteProduct, getAllProduct };
