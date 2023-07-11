"use strict"

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  const { firstName, email, password } = req.body; // Update variable name to firstName

  try {
    const user = await User.register({ email, password, firstName, lastName: "" }); // Use firstName here

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
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.authenticate({ email, password });

//     // Generate and sign JWT token
//     const token = jwt.sign(
//       { userId: user.id, userName: user.firstName },
//       "secret-key-unique",
//       {
//         expiresIn: "1h",
//       }
//     );

//     res.status(200).json({
//       message: "Login Successful",
//       token: token,
//       user: user,
//     });
//   } catch (error) {
//     console.error("Error logging in: ", error);
//     res.status(500).json({ message: "Error Logging in" });
//   }
// });
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.authenticate({ email, password });

    if (!user) {
      // User not found or invalid password
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(
      "USER @: ",user)
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
// router.post("/exercises", async (req, res) => {
//   const { exerciseName, exerciseType, duration, intensity, userId } = req.body;

//   try {
//     // Call the addExercise method from your User model
//     const exercise = await User.addExercise({
//       exerciseName,
//       exerciseType,
//       duration,
//       intensity,
//       userId,
//     });
//     console.log(userId);

//     res.status(201).json({ message: "Exercise added successfully", exercise });
//   } catch (error) {
//     console.error("Error adding exercise: ", error);
//     res.status(500).json({ message: "Error adding exercise" });
//   }
// });

// router.get(/exercises)
// search database for exercises based on userId

router.post("/exercises", async (req, res) => {
  console.log("at exercices route")
  const { exerciseName, exerciseType, duration, intensity, userId } = req.body;

  try {
    // Call the addExercise method from your User model
    const exercise = await User.addExercise({
      exerciseName,
      exerciseType,
      duration,
      intensity,
      userId,
    });

    res.status(201).json({ message: "Exercise added successfully", exercise });
  } catch (error) {
    console.error("Error adding exercise: ", error);
    res.status(500).json({ message: "Error adding exercise" });
  }
});

router.get("/exercises", async (req, res) => {
  const { userId } = req.query;

  try {
    // Call the getExercisesByUserId method from your User model
    const exercises = await User.getExercisesByUserId(userId);
    console.log("routes",exercises)
    res.status(200).json({ exercises });
  } catch (error) {
    console.error("Error retrieving exercises: ", error);
    res.status(500).json({ message: "Error retrieving exercises" });
  }
});




module.exports = router;
