import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    const orderDetails = await req.json();

    await client.connect();
    const database = client.db('Products');
    const orders = database.collection('orders');
    await orders.insertOne(orderDetails);

    return NextResponse.json({ message: 'Order saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ error: 'Error saving order' }, { status: 500 });
  } finally {
    await client.close();
  }
}
