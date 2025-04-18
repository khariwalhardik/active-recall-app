import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE /api/library/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.learning.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting learning:", error);
    return NextResponse.json({ error: "Failed to delete learning" }, { status: 500 });
  }
}
// PUT /api/library/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
  
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
  