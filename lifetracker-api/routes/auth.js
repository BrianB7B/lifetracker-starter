"use strict"

/** Routes for authentication. */

// const express = require("express")
// const User = require("../models/user")
// const router = express.Router()

// router.post("/login", async function (req, res, next) {
//   try {
//     const user = await User.authenticate(req.body)
//     return res.status(200).json({ user })
//   } catch (err) {
//     next(err)
//   }
// })

// router.post("/register", async function (req, res, next) {
//   try {
//     const user = await User.register(req.body)
//     return res.status(201).json({ user })
//   } catch (err) {
//     next(err)
//   }
// })


// module.exports = router
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.register({ email, password, firstName: name, lastName: "" });

    // Generate and sign JWT token
    const token = jwt.sign(
      { userId: user.id, userName: user.firstName },
      "secret-key-unique",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.authenticate({ email, password });

    // Generate and sign JWT token
    const token = jwt.sign(
      { userId: user.id, userName: user.firstName },
      "secret-key-unique",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ message: "Error Logging in" });
  }
});

module.exports = router;
