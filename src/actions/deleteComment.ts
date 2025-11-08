"use server";

import prisma from "@/utils/prisma";

export async function DeleteComment(comId: string) {
  const comment = await prisma.comment.findUnique({
    where: { id: comId },
  });

  if (!comment) {
    console.log("Комментарий не найден:", comId);
    return { error: "Комментарий не найден" };
  }

  return await prisma.comment.delete({ where: { id: comId } });
}
