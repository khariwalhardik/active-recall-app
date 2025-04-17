import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Source, LearningType } from "@prisma/client";
import fs from "fs";
import path from "path";

// Disable body parsing to handle FormData manually
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await parseFormData(req);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const source = formData.get("source") as Source;
    const typek = formData.get("typek") as LearningType;
    const isImportant = formData.get("isImportant") === "true";
    const imageFile = formData.get("image") as File | null; // Using `imageFile` to avoid name collision
    // console.log("imageFile:", imageFile);
    
    // Basic validation
    if (!title || !content || !source || !typek) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }


let imageUrl: string = ""; // Initialize imageUrl to an empty string
// Handle image upload
if (imageFile && imageFile instanceof File) {
  console.log("Processing image file:", imageFile.name);
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const fileName = `${Date.now()}-${imageFile.name}`;
  const imagePath = path.join(process.cwd(), "public", "uploads", fileName);

  if (!fs.existsSync(path.dirname(imagePath))) {
    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
  }

  fs.writeFileSync(imagePath, buffer);

  imageUrl = `/uploads/${fileName}`;
  console.log("Image saved to:", imageUrl);
}


    // Create the record in the database
    const newLearning = await prisma.learning.create({
      data: {
        title,
        content,
        source,
        type: typek,
        isImportant,
        image: imageUrl,  // Store the image URL or path in the database
      },
    });

    console.log("New learning created:", newLearning);
    return new NextResponse(JSON.stringify(newLearning), { status: 200 });

  } catch (error) {
    console.error("Error creating learning:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// Utility: Parse raw form data
async function parseFormData(req: Request): Promise<FormData> {
  return new Promise<FormData>((resolve, reject) => {
    const formData = new FormData();

    req.text().then((body) => {
      const boundary = body.split("\r\n")[0];
      const parts = body.split(boundary).slice(1, -1);

      parts.forEach((part) => {
        const match = part.match(/Content-Disposition: form-data; name="([^"]+)"/);
        if (match) {
          const key = match[1];
          const value = part.split("\r\n\r\n")[1]?.split("\r\n--")[0];
          if (value) {
            formData.append(key, value.trim());
          }
        }
      });

      resolve(formData);
    }).catch(reject);
  });
}
