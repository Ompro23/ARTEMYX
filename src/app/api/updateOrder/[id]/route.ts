import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const client = new MongoClient(uri);

interface Params {
  id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    const orderDetails = await req.json();

    await client.connect();
    const database = client.db('Products');
    const orders = database.collection('orders');

    const objectId = new ObjectId(id);

    const result = await orders.updateOne(
      { _id: objectId },
      { $set: orderDetails }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Order not found or no changes applied' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
  } finally {
    await client.close();
  }
}
