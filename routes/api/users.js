const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "all fields are required" });
  }

  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.json({ email: user.email });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "all fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "password should be 6 characters" });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }
    user = new User({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(5);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send("successfully registered");
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
