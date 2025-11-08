"use server";

import prisma from "@/utils/prisma";

export async function updateUser(data: {
  email: string;
  name: string;
  about: string;
}) {
  if (!data.email) throw new Error("Email is required");

  const updated = await prisma.user.update({
    where: { email: data.email },
    data: {
      email: data.email,
      name: data.name,
      about: data.about,
    },
  });

  return updated;
}
