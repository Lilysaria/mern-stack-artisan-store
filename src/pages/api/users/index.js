import mongoose from 'mongoose';
import User from '../../../../models/user.js';
import jwt from 'jsonwebtoken';
import { saveToken } from '../../../utils/auth';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      if (req.body.action === 'signup') {
        const { email, password, username } = req.body;
        try {
          const user = new User({ email, password, username });
          await user.save();
          
          // generate JWT token after successful signup
          const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
          
          res.status(201).json({ message: 'User created successfully', token });
        } catch (error) {
          console.error('Signup error:', error);
          res.status(400).json({ message: 'User creation failed', error: error.message });
        }
      } else if (req.body.action === 'login') {
        const { email, password } = req.body;
        try {
          const user = await User.findOne({ email });
          if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }

          // generate JWT
          const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
          
          
          // espond with the token
          res.status(200).json({ token });
        } catch (error) {
          res.status(500).json({ message: 'Login failed', error });
        }
      } else {
        res.status(400).json({ message: 'Invalid action' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
