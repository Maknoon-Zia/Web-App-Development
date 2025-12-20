const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");

// Create Product
router.post("/", auth, async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    const product = new Product({ name, price, description, category });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get All Products
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update Product
router.put("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete Product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
