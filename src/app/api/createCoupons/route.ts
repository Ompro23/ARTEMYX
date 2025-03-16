import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

interface Coupon {
  _id?: ObjectId;
  name: string;
  discountPer: number;
  coupon: string;
  size?: string;
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const database = client.db('Products');
    const coupons = database.collection('coupens');
    const reqBody = await req.json();
    const { name, discountPer, coupon } = reqBody;

    // Create a new coupon
    const newCoupon: Coupon = {
      name,
      discountPer: parseFloat(discountPer),
      coupon,
    };

    // Save the coupon to the database
    const result = await coupons.insertOne(newCoupon);

    // Fetch the newly inserted coupon
    return NextResponse.json({ message: "Coupon created successfully", coupon: {
      _id: result.insertedId,
      name: newCoupon.name,
      discountPer: newCoupon.discountPer,
      coupon: newCoupon.coupon
    } }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating coupon:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const database = client.db('Products');
    const coupons = database.collection('coupens');

    const allCoupons = await coupons.find().toArray();

    return NextResponse.json(allCoupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ error: 'Error fetching coupons' }, { status: 500 });
  }
}

// Removed the PUT handler as it's now in [id]/route.ts
