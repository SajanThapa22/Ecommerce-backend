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
    if (!cart) return res.status(404).send("No cart found for this user");
    res.json(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { productId } = req.body;

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
      res.status(400).send("item is already in the cart");
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
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOneAndDelete({ user: req.user._id });
    if (!cart) return res.status(404).send("No cart found for this user");

    cart.items.id(itemId).remove();
    await cart.save();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
