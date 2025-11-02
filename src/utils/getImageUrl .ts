import { BackdropSize, PosterSize, TmdbImageSize } from "@/types/movie.types";

const getImageUrl = (
  path: string | null,
  size: TmdbImageSize = "w500"
): string => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/no-image.png";
};

export const getPosterUrl = (path: string | null, size: PosterSize = "w500") =>
  getImageUrl(path, size);

export const getBackdropUrl = (
  path: string | null,
  size: BackdropSize = "w1280"
) => getImageUrl(path, size);
