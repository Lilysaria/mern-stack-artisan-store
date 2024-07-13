const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET } = process.env;

module.exports = async function(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = await User.findById(decoded.userId);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Authorization header not found' });
  }
};
