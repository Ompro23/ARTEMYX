import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';

const OrderSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  totalPrice: Number,
  email: String,
  name: String,
  phone: String,
  address: String,
  pincode: String,
  city: String,
  state: String,
  country: String,
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
  }
  await mongoose.connect(mongoUri, {
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectDB();
    const order = new Order(req.body);
    try {
      await order.save();
      
      // Razorpay integration
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: order.totalPrice * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: order._id.toString(),
      };

      const response = await razorpay.orders.create(options);
      res.status(200).json({
        message: 'Order saved successfully',
        orderId: response.id,
        amount: response.amount,
        currency: response.currency,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error saving order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
