import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file received" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "uploads");

  try {
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, path: `/uploads/${file.name}` });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("File upload failed:", err.message);
    } else {
      console.error("File upload failed with an unknown error");
    }
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
  
}
