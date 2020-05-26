const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const User = require("../../models/User");

// Create Register route
router.post("/register", async (req, res) => {
  try {
    // Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    // Create new User
    const newUser = new User({
      name,
      email,
      password,
    });

    // Hash Password
    const hashedPassword = passwordHash.generate(password);
    newUser.password = hashedPassword;

    // Save User in db
    const save = await newUser.save();
    res.json(save);
  } catch (ex) {
    console.log(ex);
  }
});

// Create Login route
router.post("/login", async (req, res) => {
  // Form Validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  // Check Email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ emailNotFound: "Email not found" });

  // Check Password
  const checkPassword = passwordHash.verify(password, user.password);
  if (!checkPassword)
    return res.status(400).json({ passwordIncorrect: "Incorrect Password" });

  // Create JWT Payload
  const payload = {
    id: user._id,
    name: user.name,
  };

  // Sign Token
  jwt.sign(
    payload,
    keys.secretOrKey,
    {
      expiresIn: 31556926,
    },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    }
  );
});

module.exports = router;
