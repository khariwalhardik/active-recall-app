// app/api/learnings/route.ts
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { Source, LearningType } from "@prisma/client";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const source = formData.get("source") as Source;
  const typek = formData.get("typek") as LearningType;
  const isImportant = formData.get("isImportant") === "true";
  const file = formData.get("image") as File;

  if (!title || !content || !source || !typek) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  let imageUrl = "";
  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    imageUrl = `/uploads/${fileName}`;
  }

  try {
    const learning = await prisma.learning.create({
      data: {
        title,
        content,
        source,
        type: typek,
        isImportant,
        image: imageUrl,
      },
    });

    return new Response(JSON.stringify(learning), { status: 200 });
  } catch (err) {
    console.error("Prisma error:", err);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
    });
  }
}
