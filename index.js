const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

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
app.use("/api/users", users);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
