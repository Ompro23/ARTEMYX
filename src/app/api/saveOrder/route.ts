import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(req: NextRequest) {
  console.log('POST /api/saveOrder request received at:', new Date().toISOString());
  
  try {
    const orderData = await req.json();
    console.log('Order data received:', JSON.stringify(orderData));
    
    // Add timestamp to the order
    const orderWithTimestamp = {
      ...orderData,
      createdAt: new Date().toISOString(),
    };
    
    const { db } = await connectToDatabase();
    
    // Check if collection exists, create if it doesn't
    const collections = await db.listCollections({ name: 'orders' }).toArray();
    if (collections.length === 0) {
      console.log('Creating orders collection');
      await db.createCollection('orders');
    }
    
    // Insert the order
    const result = await db.collection('orders').insertOne(orderWithTimestamp);
    console.log('Order saved successfully with ID:', result.insertedId);
    
    return NextResponse.json({ success: true, orderId: result.insertedId }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error saving order:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to save order', details: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0',
        }
      }
    );
  }
}
