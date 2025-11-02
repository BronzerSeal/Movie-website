"use client";
import { Movie } from "@/types/movie.types";
import { create } from "zustand";

interface MovieCategory {
  data: Movie[];
  loading: boolean;
  error: string | null;
}

interface MovieStore {
  topRated: MovieCategory;
  NowPlaying: MovieCategory;
  popular: MovieCategory;
  upcoming: MovieCategory;
  setTopRated: (data: Movie[]) => void;
  setNowPlaying: (data: Movie[]) => void;
  setPopular: (data: Movie[]) => void;
  setUpcoming: (data: Movie[]) => void;

  setLoading: (category: keyof MovieStore, value: boolean) => void;
  setError: (category: keyof MovieStore, message: string | null) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  NowPlaying: { data: [], loading: false, error: null },
  popular: { data: [], loading: false, error: null },
  upcoming: { data: [], loading: false, error: null },
  topRated: { data: [], loading: false, error: null },

  setNowPlaying: (data) =>
    set({ NowPlaying: { data, loading: false, error: null } }),

  setPopular: (data) => set({ popular: { data, loading: false, error: null } }),

  setUpcoming: (data) =>
    set({ upcoming: { data, loading: false, error: null } }),

  setTopRated: (data) =>
    set({ topRated: { data, loading: false, error: null } }),

  setLoading: (category, value) =>
    set((state) => ({
      [category]: { ...state[category], loading: value },
    })),

  setError: (category, message) =>
    set((state) => ({
      [category]: { ...state[category], error: message },
    })),
}));
