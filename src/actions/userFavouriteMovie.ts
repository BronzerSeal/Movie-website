"use server";

import prisma from "@/utils/prisma";

export async function toggleFavouriteMovie(movieId: string, userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const isFavourite = user.favouriteMovies.includes(movieId);

  const updatedMovies = isFavourite
    ? user.favouriteMovies.filter((id) => id !== movieId) // удаляем
    : [...user.favouriteMovies, movieId]; // добавляем

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { favouriteMovies: updatedMovies },
  });

  return updatedUser;
}
