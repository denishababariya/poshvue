const Stripe = require('stripe');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Payment intents will not work until it is configured.');
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

// Create a PaymentIntent for card payments (supports international cards if enabled in Stripe)
exports.createPaymentIntent = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ message: 'Stripe is not configured on the server.' });
    }

    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to smallest currency unit
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    return res.status(500).json({ message: 'Failed to create payment intent' });
  }
};


