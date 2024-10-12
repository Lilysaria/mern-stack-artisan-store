import mongoose from 'mongoose';
import Product from '../../../models/product.js';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const { productId } = req.query;

    // if productId is provided, return a single product
    if (productId) {
      try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching product' });
      }
    }
    // otherwise, return all products
    else {
      try {
        const products = await Product.find({});
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching products' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
