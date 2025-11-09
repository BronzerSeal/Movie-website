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
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error: unknown) {
    console.error("❌ Error in POST /api/comments:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

// Добавить новый комментарий
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { movieId, userId, content } = body;

    if (!movieId || !userId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        movieId: Number(movieId),
        userId,
        content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: unknown) {
    console.error("❌ Error in POST /api/comments:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
