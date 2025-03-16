import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { totalPrice } = req.body;

    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: totalPrice * 100, // amount in the smallest currency unit
        currency: 'INR',
        receipt: `receipt_order_${new Date().getTime()}`,
      };

      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Error creating order' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default createOrder;
