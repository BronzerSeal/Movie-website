import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    const userId = data.get("userId") as string;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    if (!userId)
      return NextResponse.json({ error: "No userId" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", "uploads", file.name);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${file.name}`;

    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return NextResponse.json({ url: imageUrl });
  } catch (error: unknown) {
    console.log("error: ", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
