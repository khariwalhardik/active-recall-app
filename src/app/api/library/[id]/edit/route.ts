import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// PUT /api/library/:id
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // ✅ Await the params!
  
    try {
      const body = await req.json();
      const {
        title,
        content,
        source,
        type,
        isImportant,
        revisedAt,
        image,
      } = body;
  
      const updatedLearning = await prisma.learning.update({
        where: { id },
        data: {
          title,
          content,
          source,
          type,
          isImportant,
          revisedAt: revisedAt ? new Date(revisedAt) : undefined,
          image,
        },
      });
  
      return NextResponse.json(updatedLearning, { status: 200 });
    } catch (error) {
      console.error("Error updating learning:", error);
      return NextResponse.json({ error: "Failed to update learning" }, { status: 500 });
    }
  }
  
