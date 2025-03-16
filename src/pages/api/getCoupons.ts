// import { NextRequest, NextResponse } from 'next/server';
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// if (!uri) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri);
//   global._mongoClientPromise = client.connect();
// }
// clientPromise = global._mongoClientPromise;

// export async function GET(req: NextRequest) {
//   try {
//     const client = await clientPromise;
//     const database = client.db('Products');
//     const orders = database.collection('coupens');

//     const allOrders = await orders.find().toArray();

//     return NextResponse.json(allOrders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
//   }
// }
