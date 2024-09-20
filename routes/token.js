const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.post("/", auth, async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  const user = await User.findOne({ user: req.user._id });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const { accessToken } = user.generateAuthToken();
    res.json({ accessToken: accessToken });
  });
});
