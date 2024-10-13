import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from '../styles/CheckoutPage.module.css';

const stripePromise = loadStripe('pk_test_51MuUGDI0SFiFSn2zd4kNcuY3ctBw9ZfnxDlyiw4EB3IYQcHTdvPPhjiHqpABGzEGQLhH22256PeHS9ACZ22rFbNy00mmFzPpz1');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState({ line1: '', city: '', postal_code: '', country: '' });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    const loadedTotalPrice = storedCart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    setTotalPrice(loadedTotalPrice);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const serializedCartItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const paymentIntentResponse = await fetch('/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalPrice, productDetails: serializedCartItems }),
    });

    const paymentIntentData = await paymentIntentResponse.json();

    if (!paymentIntentResponse.ok || paymentIntentData.error) {
      setError('An error occurred. Please try again.');
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email,
          address: {
            line1: shippingAddress.line1,
            city: shippingAddress.city,
            postal_code: shippingAddress.postal_code,
            country: shippingAddress.country,
          },
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      setLoading(false);
    } else {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for notifications" required />
      <input type="text" value={shippingAddress.line1} onChange={(e) => setShippingAddress({ ...shippingAddress, line1: e.target.value })} placeholder="Address Line 1" required />
      <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} placeholder="City" required />
      <input type="text" value={shippingAddress.postal_code} onChange={(e) => setShippingAddress({ ...shippingAddress, postal_code: e.target.value })} placeholder="Postal Code" required />
      <input type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} placeholder="Country" required />
      <div className={styles.cartItems}>
        {cartItems.map((item, index) => (
          <div key={index}>
            <span>{item.name}</span> - <span>{item.quantity}</span> - <span>${item.price}</span>
          </div>
        ))}
      </div>
      <p>Total Price: ${totalPrice}</p>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} className={styles.submitButton}>Place Order</button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
