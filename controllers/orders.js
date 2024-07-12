const Order = require('../models/order');

const addToCart = async () => {
  try {
    const response = await axios.post(
      `/api/orders/cart`,
      { productId, quantity: 1 },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Add to cart response:', response);

    if (response.status === 200) {
      alert('Product added to cart!');
    } else {
      alert('Failed to add product to cart.');
    }
  } catch (err) {
    console.error('Error adding product to cart:', err);
    alert('Failed to add product to cart.');
  }
};



async function viewCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Order.findOne({ userId, status: 'cart' }).populate('products.productId');
    if (!cart) {
      return res.status(404).json('Cart not found');
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Order.findOne({ userId, status: 'cart' });

    if (!cart) {
      return res.status(404).json('Cart not found');
    }

    // Update cart based on request body
    const { productId, quantity } = req.body;
    const productIndex = cart.products.findIndex((item) => item.productId.equals(productId));

    if (productIndex > -1) {
      // Product exists, update quantity
      if (quantity <= 0) {
        // Remove product if quantity is 0 or less
        cart.products.splice(productIndex, 1);
      } else {
        // Update quantity
        cart.products[productIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      // Add new product to cart if not found and quantity is positive
      cart.products.push(req.body);
    }
    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function removeItemFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const cart = await Order.findOne({ userId, status: 'cart' });

    if (!cart) {
      return res.status(404).json('Cart not found');
    }

    // Remove item from cart
    cart.products = cart.products.filter((item) => !item.productId.equals(productId));
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addToCart,
  viewCart,
  updateCart,
  removeItemFromCart,
};
