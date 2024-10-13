import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cart from '../components/Cart/Cart';

const CartPage = () => {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const router = useRouter();

  useEffect(() => {
    const fetchCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalPrice = storedCart.reduce((acc, curr) => acc + curr.price, 0);
      setCart({ products: storedCart, totalPrice });
    };

    fetchCart();
  }, []);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleDelete = (productId) => {
    const updatedCart = cart.products.filter(
      (product) => product.productId !== productId
    );
    const totalPrice = updatedCart.reduce((acc, curr) => acc + curr.price, 0);
    setCart({ products: updatedCart, totalPrice });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (!cart.products.length) return <p>Your cart is empty</p>;

  return (
    <div>
      <Cart products={cart.products} onDelete={handleDelete} />
      <p>Total Price: ${cart.totalPrice}</p>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
