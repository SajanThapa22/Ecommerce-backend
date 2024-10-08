require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");
const cart = require("./routes/cart");

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3001", // Your frontend's origin
    methods: "GET,POST,PUT,DELETE", // Allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

mongoose
  .connect("mongodb://localhost:27017/myshop")
  .then(() => console.log("successfully connected to mongodb"))
  .catch((err) => console.log("couldn't connect to mongodb", err));

app.use(express.json());
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cart", cart);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
