import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { totalPrice } = req.body;
      
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('Missing Stripe secret key');
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalPrice * 100), // stripe expects amount in cents
        currency: 'usd',
      });
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
