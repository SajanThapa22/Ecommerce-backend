const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    // Find the cart for the authenticated user
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) return res.status(404).json("No cart found for this user");
    res.send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ error: "Product ID is required" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );
    if (existingItem) {
      return res.status(400).send("Item is already in the cart");
    } else {
      cart.items.push({ product: productId });
    }
    await cart.save();
    res.send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params; // 'id' is the product ID you want to delete
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { product: id } } },
      { new: true }
    );

    if (!cart) return res.status(404).send("No cart found for this user");
    res.status(200).send("Item deleted from cart");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
