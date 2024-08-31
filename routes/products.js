const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");

// const products = [
//   {
//     id: 1,
//     name: "ab",
//     description: "this is product",
//     price: 1234,
//     image:
//       "https://assets2.razerzone.com/images/pnx.assets/7257c4132da98a3667632a86ac9a6a65/dav2-hero780h.jpg",
//   },
// ];

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

module.exports = router;
