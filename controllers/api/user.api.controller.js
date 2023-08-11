const db = require("../../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const existUser = await User.findOne({ where: { username } });
      const existEmail = await User.findOne({ where: { email } });

      if (existUser) {
        return res.status(409).json({ msg: "Email is already used" });
      }

      if (existEmail) {
        return res.status(409).json({ msg: "Email is already used " });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(404).json({ msg: "Email not found" });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: "Wrong password" });
      }

      // Create a JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" } // Set the token expiration time as needed
      );

      res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  check: async (req, res) => {
    try {
      const token = req.header("Authorization");
      console.log(token);

      if (!token) {
        return res.status(401).json({ isAuthenticated: false });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ isAuthenticated: false });
        }

        res.status(200).json({ isAuthenticated: true });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  profile: async (req, res) => {
    try {
      const token = req.header("Authorization");

      if (!token) {
        return res.status(401).json({ msg: "Token not found" });
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid token" });
        }

        const user = await User.findOne({
          where: { id: decoded.userId },
          attributes: ["username"],
        });

        if (user) {
          res.json({ username: user.username });
        } else {
          res.status(404).json({ msg: "User not found" });
        }
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  logout: async (req, res) => {
    try {
      // For JWT, there's no need to perform any server-side logout action
      res.status(200).json({ msg: "Logout success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};
