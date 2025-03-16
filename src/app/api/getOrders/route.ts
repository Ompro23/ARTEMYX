import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const database = client.db('Products');
    const orders = database.collection('orders');

    const allOrders = await orders.find().toArray();

    return NextResponse.json(allOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}
