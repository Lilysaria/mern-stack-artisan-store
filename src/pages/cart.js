import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cart from '../components/Cart/Cart';
import styles from '../components/Cart/Cart.module.css';

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

  return (
    <div>
      <Cart products={cart.products} onDelete={handleDelete} />
      {cart.products.length > 0 && (
        <>
        <div className={styles.centered}>
  <p>Total Price: ${cart.totalPrice}</p>
  <button className={styles.button} onClick={handleCheckout}>
    Proceed to Checkout
  </button>
</div>
        </>
      )}
    </div>
  );
};

export default CartPage;
