import {
  DetailMovie,
  MovieResponse,
  movieVideoResponse,
} from "@/types/movie.types";
import httpService from "./http.service";

const ServiceEndpoint = "movie/";

const nowPlayingEndpoint = `${ServiceEndpoint}now_playing`;
const popularEndpoint = `${ServiceEndpoint}popular`;
const upcomingEndpoint = `${ServiceEndpoint}upcoming`;
const topRatedEndpoint = `${ServiceEndpoint}top_rated`;

export const movieService = {
  getNowPlayingFilms: async () => {
    const response = await httpService.get<MovieResponse>(nowPlayingEndpoint, {
      params: { language: "en-US", page: 1 },
    });
    return response.data;
  },
  getPopularFilms: async () => {
    const response = await httpService.get<MovieResponse>(popularEndpoint, {
      params: { language: "en-US", page: 1 },
    });
    return response.data;
  },
  getUpcomingFilms: async () => {
    const response = await httpService.get<MovieResponse>(upcomingEndpoint, {
      params: { language: "en-US", page: 1 },
    });
    return response.data;
  },
  getTopRatedFilms: async () => {
    const response = await httpService.get<MovieResponse>(topRatedEndpoint, {
      params: { language: "en-US", page: 1 },
    });
    return response.data;
  },
  getMovieById: async (id: string) => {
    const response = await httpService.get<DetailMovie>(
      `${ServiceEndpoint}${id}`,
      {
        params: { language: "en-US" },
      }
    );
    return response.data;
  },
  getMovieVideoById: async (id: number) => {
    const response = await httpService.get<movieVideoResponse>(
      `${ServiceEndpoint}${id}/videos`,
      {
        params: { language: "en-US" },
      }
    );
    return response.data;
  },
  getSimilarMoviesById: async (id: string) => {
    const response = await httpService.get<MovieResponse>(
      `${ServiceEndpoint}${id}/similar`,
      {
        params: { language: "en-US" },
      }
    );
    return response.data;
  },
};
