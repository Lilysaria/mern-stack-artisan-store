import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// etrieve the secret key from environment variables
const { SECRET } = process.env;

// function to verify JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

// middleware for authentication and user retrieval
export default async function (req, res, next) {
  // extract the authorization header
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token and decode its payload
      const decoded = verifyToken(token);

      // retrieve user from database, excluding the password field
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        // if user not found, return 401 Unauthorized
        return res.status(401).json({ message: 'User not found' });
      }

      // user authenticated successfully, proceed to next middleware
      next();
    } catch (err) {
      // log any auth errors
      console.error('Authentication error:', err);
      
      // return 401 unauthorized for invalid tokens
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // return 401 Unauthorized if Authorization header is missing
    res.status(401).json({ message: 'Authorization header not found' });
  }
}
