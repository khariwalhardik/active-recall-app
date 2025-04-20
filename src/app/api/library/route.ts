import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust if needed based on your prisma instance setup


export async function GET() {
  try {
    // Fetch all learning records from the database
    const learnings = await prisma.learning.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        source: true,
        type: true,
        isImportant: true,
        image: true,
      },
    });

    // Return a JSON response with the list of learnings
    return NextResponse.json(learnings, { status: 200 });
  } catch (error) {
    console.error("Error fetching learnings:", error);
    return NextResponse.json(
      { error: "Error fetching learnings" },
      { status: 500 }
    );
  }
}
