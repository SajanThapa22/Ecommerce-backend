require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).send("Access denied. No token provided");

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: err.message });
      }

      req.user = user;
      next();
    });
  } catch (ex) {
    console.error("Token Verification Error:", ex);
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
