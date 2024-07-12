import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutPage.css';

// Initializes Stripe.js with the provided public key, returning a promise that resolves to the Stripe object
// This ensures Stripe is fully loaded and ready to use
const stripePromise = loadStripe('pk_test_51MuUGDI0SFiFSn2zd4kNcuY3ctBw9ZfnxDlyiw4EB3IYQcHTdvPPhjiHqpABGzEGQLhH22256PeHS9ACZ22rFbNy00mmFzPpz1');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Collects user's email for order confirmation and notifications
  const [email, setEmail] = useState('');
  // Stores shipping address input by the user
  const [shippingAddress, setShippingAddress] = useState({ line1: '', city: '', postal_code: '', country: '' });
  // Cart items and total price are loaded from localStorage to be used in the payment intent
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items and total price from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    const loadedTotalPrice = storedCart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    setTotalPrice(loadedTotalPrice);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Guard clause to ensure Stripe.js has loaded
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Serialize cart items for the payment intent
    const serializedCartItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create payment intent on the server
    const paymentIntentResponse = await fetch('/api/create-payment-intent', {
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
    <form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for notifications" required />
      <input type="text" value={shippingAddress.line1} onChange={(e) => setShippingAddress({ ...shippingAddress, line1: e.target.value })} placeholder="Address Line 1" required />
      <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} placeholder="City" required />
      <input type="text" value={shippingAddress.postal_code} onChange={(e) => setShippingAddress({ ...shippingAddress, postal_code: e.target.value })} placeholder="Postal Code" required />
      <input type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} placeholder="Country" required />
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index}>
            <span>{item.name}</span> - <span>{item.quantity}</span> - <span>${item.price}</span>
          </div>
        ))}
      </div>
      <p>Total Price: ${totalPrice}</p>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: '20px' }}>Place Order</button>
      {error && <div>{error}</div>}
    </form>
  );
};

// utilize the Elements component from Stripe's React library to inject Stripe's functionality into the checkout process
// stripePromise is passed to `Elements` as a prop, which is a promise that resolves to a Stripe object configured with our specific API key
const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
