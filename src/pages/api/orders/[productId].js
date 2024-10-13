import dbConnect from '../../../utils/dbConnect';
import Order from '../../../models/order';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    return removeItemFromCart(req, res);
  }

  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function removeItemFromCart(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { productId } = req.query;
    const cart = await Order.findOne({ userId, status: 'cart' });

    if (!cart) {
      return res.status(404).json('Cart not found');
    }

    cart.products = cart.products.filter((item) => !item.productId.equals(productId));

    // recalculate total price
    cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
