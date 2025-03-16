import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
    };
    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        redirectUrl: `https://checkout.razorpay.com/v1/checkout.js?order_id=${order.id}`
      });
      // Redirect to Razorpay payment page
      res.redirect(`https://checkout.razorpay.com/v1/checkout.js?order_id=${order.id}`);
    } catch (error) {
      res.status(500).json({ error: 'Error creating order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
