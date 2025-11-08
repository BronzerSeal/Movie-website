"use server";
import prisma from "@/utils/prisma";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
