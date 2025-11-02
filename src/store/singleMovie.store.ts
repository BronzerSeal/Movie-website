import { DetailMovie, Movie } from "@/types/movie.types";
import { create } from "zustand";

interface SingleMovie {
  movie: DetailMovie | null;
  similarMovies: Movie[] | null;
  loading: boolean;
  error: string | null;

  setMovie: (data: DetailMovie) => void;
  setSimilarMovies: (data: Movie[]) => void;
  reset: () => void;

  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
}

export const useSingleMovieStore = create<SingleMovie>((set) => ({
  movie: null,
  similarMovies: null,
  loading: false,
  error: null,
  setMovie: (movie) => set({ movie, loading: false }),
  setSimilarMovies: (similarMovies) => set({ similarMovies, loading: false }),
  setLoading: (value) => set({ loading: value }),
  setError: (message) => set({ error: message }),
  reset: () => set({ movie: null, loading: false, error: null }),
}));
