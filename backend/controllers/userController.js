const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = new User({
        username,
        email,
        password,
      });

      const registeredUser = await newUser.save();

      res.status(201).json({
        message: "User registered successfully",
        user: registeredUser,
      });
    } else {
      res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid Email or Password " });
    }

    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid Email or Password " });
    }
    const userID = existingUser._id;
    const token = jwt.sign({ userId: User._id }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      username: existingUser.username,
      token,
      userID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login Error" });
  }
};

module.exports = { userLogin, registerUser };
