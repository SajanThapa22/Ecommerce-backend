const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

exports.productSchema = productSchema;
exports.Product = Product;
