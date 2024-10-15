import Order from '../../../../models/order.js';

// this file serves as an API route handler in Nextjs, replacing the previous Express route

export default async function handler(req, res) {
  await dbConnect();

  // handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return addToCart(req, res);
    case 'GET':
      return viewCart(req, res);
    case 'PUT':
      return updateCart(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// previously a client-side function, now a server-side handler
async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    // TODO: Implement user authentication
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // find or create cart
    let cart = await Order.findOne({ userId, status: 'cart' });
    if (!cart) {
      cart = new Order({ userId, products: [], status: 'cart', totalPrice: 0 });
    }

    // add product to cart or update quantity
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    // calculate total price server-side
    cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function viewCart(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const cart = await Order.findOne({ userId, status: 'cart' }).populate('products.productId');
    if (!cart) {
      return res.status(404).json('Cart not found');
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// new function to update cart contents
async function updateCart(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const cart = await Order.findOne({ userId, status: 'cart' });
    if (!cart) {
      return res.status(404).json('Cart not found');
    }

    const { productId, quantity } = req.body;
    const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));

    if (productIndex > -1) {
      if (quantity <= 0) {
        cart.products.splice(productIndex, 1);
      } else {
        cart.products[productIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      cart.products.push({ productId, quantity });
    }

    // recalculate total price
    cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
