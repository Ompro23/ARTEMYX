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

// DELETE handler
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("DELETE route handler called with params:", params);
  
  try {
    const client = await clientPromise;
    const database = client.db('Products');
    const coupons = database.collection('coupens');
    const id = params.id;

    console.log("Attempting to delete coupon with ID:", id);

    if (!ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format for ID:", id);
      return NextResponse.json({ error: "Invalid Coupon ID" }, { status: 400 });
    }

    const objectId = new ObjectId(id);
    
    // Find the coupon by ID and delete it
    const deletedCoupon = await coupons.findOneAndDelete({ _id: objectId });
    console.log("Delete operation result:", deletedCoupon);

    if (!deletedCoupon) {
      return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Coupon deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add PUT handler in the same file
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("PUT route handler called with params:", params);
    
    const client = await clientPromise;
    const database = client.db('Products');
    const coupons = database.collection('coupens');
    const id = params.id;
    
    console.log("Received PUT request for coupon ID:", id);
    
    if (!ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format for ID:", id);
      return NextResponse.json({ error: "Invalid Coupon ID" }, { status: 400 });
    }
    
    const reqBody = await req.json();
    const { name, discountPer, coupon } = reqBody;
    console.log("Update data:", { name, discountPer, coupon });

    // Try to find the coupon first to make sure it exists
    const existingCoupon = await coupons.findOne({ _id: new ObjectId(id) });
    console.log("Existing coupon:", existingCoupon);

    if (!existingCoupon) {
      console.log("Coupon not found with ID:", id);
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    // Find the coupon by ID and update it
    const updateResult = await coupons.updateOne(
      { _id: new ObjectId(id) },
      { $set: { 
          name, 
          discountPer: parseFloat(discountPer || '0'), 
          coupon 
        } 
      }
    );
    console.log("Update result:", updateResult);

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 });
    }

    // Fetch the updated coupon
    const updatedCoupon = await coupons.findOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ message: "Coupon updated successfully", coupon: updatedCoupon }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating coupon:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
