const express = require("express");
const app = express();
const products = require("./routes/products");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/myshop")
  .then(console.log("successfully connected to mongodb"))
  .catch((err) => console.log("couldn't connect to mongodb", err));

app.use(express.json());
app.use("/api/products", products);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("listening on http://localhost:3000"));
