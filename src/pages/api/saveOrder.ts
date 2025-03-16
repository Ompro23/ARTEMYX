import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const orderDetails = req.body;

    try {
      await client.connect();
      const database = client.db('Products');
      const orders = database.collection('orders');
      await orders.insertOne(orderDetails);
      res.status(200).json({ message: 'Order saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving order' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
