const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models");

// Register User
exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Login User
exports.login = async (req, res) => {

  try {

    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};