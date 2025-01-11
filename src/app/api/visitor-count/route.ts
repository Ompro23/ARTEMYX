import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Path to the JSON file
const filePath = path.join(process.cwd(), "src", "data", "visitorCount.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const { count } = JSON.parse(fileData);
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error reading visitor count:", error);
    return NextResponse.json(
      { error: "Failed to read visitor count" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);
    const newCount = data.count + 1;

    // Update the JSON file
    fs.writeFileSync(filePath, JSON.stringify({ count: newCount }, null, 2));
    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error("Error updating visitor count:", error);
    return NextResponse.json(
      { error: "Failed to update visitor count" },
      { status: 500 }
    );
  }
}
