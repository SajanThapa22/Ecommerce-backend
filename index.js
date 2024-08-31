const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./routes/products");
const mongoose = require("mongoose");

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's origin
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
