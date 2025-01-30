import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB client setup
const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "visitorCountsDB";
const collectionName = "pageCounts";

// Function to get visitor count from MongoDB
const getVisitorCount = async (pageName: string) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.findOne({ pageName });

    return result ? result.count : 0; // Return count or 0 if not found
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    return 0; // Return 0 in case of error
  } finally {
    await client.close();
  }
};

// Function to update visitor count in MongoDB
const updateVisitorCount = async (pageName: string, newCount: number) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Update or insert the document using pageName as identifier
    await collection.updateOne(
      { pageName },
      { $set: { count: newCount } },
      { upsert: true } // Insert if the page document does not exist
    );
  } catch (error) {
    console.error("Error updating visitor count:", error);
  } finally {
    await client.close();
  }
};

// API to get and increment visitor count
export async function GET(req: NextRequest) {
  const pageName = "SAL100"; // Define your page identifier (this could be dynamic if needed)
  const count = await getVisitorCount(pageName);
  return NextResponse.json({ count });
}

export async function POST(req: NextRequest) {
  const pageName = "SAL100"; // Define your page identifier (this could be dynamic if needed)

  try {
    const currentCount = await getVisitorCount(pageName);
    const newCount = currentCount + 1;

    await updateVisitorCount(pageName, newCount);
    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
