import { MovieResponse } from "@/types/movie.types";
import httpService from "./http.service";

const ServiceEndpoint = "search/";

export const searchService = {
  getMovieByName: async (movieName: string) => {
    const response = await httpService.get<MovieResponse>(
      `${ServiceEndpoint}/movie`,
      {
        params: { language: "en-US", query: movieName },
      }
    );
    return response.data;
  },
};
