import React from 'react';
import './Cart.css';

const Cart = ({ products, onDelete }) => {
  return (
    <div className="cart">
      <ul>
        {products.map((product, index) => (
          <li key={index} className="cart-item">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <p className="cart-item-name">{product.name}</p>
              <p className="cart-item-price">${product.price}</p>
            </div>
            <button
              onClick={() => onDelete(product.productId)}
              className="delete-button"
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
