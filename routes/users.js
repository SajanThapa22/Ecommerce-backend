const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User, validate } = require("../models/user");

// Route to get all products
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User with the email is already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  const picked = _.pick(user, ["_id", "name", "email"]);
  res.header("x-auth-token", token).send(picked);
});

module.exports = router;
