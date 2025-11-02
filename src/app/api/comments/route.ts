import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

// Получить все комментарии для фильма
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");

    if (!movieId) {
      return NextResponse.json(
        { error: "movieId is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: { movieId: Number(movieId) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error: any) {
    console.error("❌ Error in POST /api/comments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Добавить новый комментарий
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming comment:", body);

    const { movieId, userId, username, avatarUrl, content } = body;

    if (!movieId || !userId || !username || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        movieId: Number(movieId),
        userId,
        username,
        avatarUrl,
        content,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error in POST /api/comments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
