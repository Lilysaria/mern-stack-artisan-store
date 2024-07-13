const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET } = process.env;

async function signup(req, res, next) {
  try {
    const { email, password, username } = req.body;
    const user = new User({ email, password, username });
    await user.save();
    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "User with this email or username already exists" });
    }
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}

async function addFavorite(req, res, next) {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    res.status(200).json({ message: 'Favorite added successfully' });
  } catch (err) {
    next(err);
  }
}

async function getFavorites(req, res, next) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ favorites: user.favorites });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
  addFavorite,
  getFavorites,
};
