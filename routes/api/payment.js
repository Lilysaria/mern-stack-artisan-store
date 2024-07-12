const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  let { totalPrice, productDetails } = req.body; // Accept productDetails from the client

  // Convert totalPrice to cents and ensure it's an integer
  totalPrice = Math.round(totalPrice * 100);

  if (totalPrice < 50) {
    return res.status(400).json({ error: 'Amount must be at least $0.50 usd' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd',
      metadata: {
        // Convert productDetails object to a string to store in metadata
        productDetails: JSON.stringify(productDetails),
      },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
