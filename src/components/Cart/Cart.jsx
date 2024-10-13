import React from 'react';
import styles from './Cart.module.css';

const Cart = ({ products, onDelete }) => {
  return (
    <div className={styles.cart}>
      <ul>
        {products.map((product, index) => (
          <li key={index} className={styles.cartItem}>
            <img
              src={product.imageUrl}
              alt={product.name}
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
