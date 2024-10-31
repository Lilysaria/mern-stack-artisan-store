import React from 'react';
import Image from 'next/image';
import styles from './Cart.module.css';

const Cart = ({ products, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className={styles.emptyCartMessage}>
        <h2>Your Cart is Empty</h2>
        <p>It looks like you haven&apos;t added anything to your cart yet.</p>
        <p>Browse our collection and find something you love!</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <ul>
        {products.map((product, index) => (
          <li key={index} className={styles.cartItem}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={100}
              height={100}
              className={styles.cartItemImage}
            />
            <div className={styles.cartItemDetails}>
              <p className={styles.cartItemName}>{product.name}</p>
              <p className={styles.cartItemPrice}>${product.price}</p>
            </div>
            <button
              onClick={() => onDelete(product.productId)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
