import mongoose from 'mongoose';
import User from '../../../../../models/user';
import { verifyToken } from '../../../../../config/auth';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { userId } = req.query;
    const { productId } = req.body;

    // verify token from authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = verifyToken(token);
      if (decoded.userId !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (!user.favorites.includes(productId)) {
        user.favorites.push(productId);
      }
      await user.save();

      res.status(200).json({ message: 'Product added to favorites' });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Authentication error', error: error.message });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const user = await User.findById(userId).populate('favorites');
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json(user.favorites); // send the favorites list
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites', error });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
