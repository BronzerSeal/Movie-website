export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  video: boolean;
  vote_count: number;
}

export interface MovieResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface DetailMovie extends Movie {
  belongs_to_collection: boolean;
  genres: { id: number; name: string }[];
  spoken_languages: [{ english_name: string; iso_639_1: string; name: string }];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  production_countries: { iso_3166_1: string; name: string }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string | null;
  }[];
}

export interface movieVideo {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
}

export interface movieVideoResponse {
  id: number;
  results: movieVideo[];
}

export type PosterSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";
export type BackdropSize = "w300" | "w780" | "w1280" | "original";
export type ProfileSize = "w45" | "w185" | "h632" | "original";
export type LogoSize =
  | "w45"
  | "w92"
  | "w154"
  | "w185"
  | "w300"
  | "w500"
  | "original";
export type TmdbImageSize = PosterSize | BackdropSize | ProfileSize | LogoSize;
