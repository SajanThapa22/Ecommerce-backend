const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const paginate = require("../middleware/paginate");
const auth = require("../middleware/auth");

// Route to get all products
router.get("/", auth, paginate(Product), async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    console.error("Error occurred while fetching products:", err);
    res.status(500).send({ message: err.message });
  }
});

// Route to get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      console.log("No product found with the given ID");
      return res.status(404).send("Product not found");
    } else {
      return res.send(product);
    }
  } catch (err) {
    console.error("Error occurred while fetching product:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
