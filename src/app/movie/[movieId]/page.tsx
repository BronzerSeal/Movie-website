"use client";
import MovieCard from "@/components/common/movieCard";
import MovieRatingCard from "@/components/movieRatingCard";
import CommentsSection from "@/components/ui/commentsSection";
import MovieTrailer from "@/components/ui/movieTrailer";
import NowPlayingBigCard from "@/components/ui/nowPlayingBigCard";
import { commentService } from "@/services/commentService";
import { movieService } from "@/services/movieService";
import { useCommentStore } from "@/store/comment.store";
import { useSingleMovieStore } from "@/store/singleMovie.store";
import { getBackdropUrl } from "@/utils/getImageUrl ";
import {
  Avatar,
  AvatarGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const {
    movie,
    similarMovies,
    loading,
    error,
    setMovie,
    setSimilarMovies,
    setLoading,
    setError,
    reset,
  } = useSingleMovieStore();

  const {
    comments,
    loading: commentsLoading,
    setComments,
    setLoading: setCommentLoading,
    setError: setCommentError,
  } = useCommentStore();

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const [movieData, similarData] = await Promise.all([
          movieService.getMovieById(movieId),
          movieService.getSimilarMoviesById(movieId),
        ]);

        setMovie(movieData);
        setSimilarMovies(similarData.results.slice(0, 6));
      } catch {
        setError("Ошибка загрузки данных фильмов");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
    return () => reset();
  }, [movieId]);

  useEffect(() => {
    async function loadComments() {
      try {
        setCommentLoading(true);
        const data = await commentService.getCommentsByFilmId(movieId);

        setComments(data);
      } catch {
        setCommentError("Ошибка загрузки комментариев");
      } finally {
        setCommentLoading(false);
      }
    }

    loadComments();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center mt-3">
        <div className="text-4xl font-bold text-white">{error}</div>
      </div>
    );
  if (!movie || !similarMovies) return null;

  return (
    <div className="container text-white">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)] gap-6 items-start">
        <div>
          <NowPlayingBigCard
            movieDopInfo={{
              adult: movie.adult,
              budget: movie.budget,
              genres: movie.genres,
              original_language: movie.original_language,
              release_date: movie.release_date,
            }}
            id={movie.id}
            bgPath={movie.backdrop_path}
            title={movie.title}
            showButtons={false}
          />
          <p className="text-gray-300 text-[18px] mt-3">{movie.overview}</p>

          <section>
            <h1 className="text-3xl font-bold mt-4 mb-2">Cast</h1>
            <AvatarGroup>
              {movie.production_companies.map((company) => (
                <Popover key={company.id} placement="top" showArrow offset={10}>
                  <PopoverTrigger>
                    <Avatar
                      className="cursor-pointer size-14 hover:scale-110 transition-transform duration-200"
                      src={
                        company.logo_path
                          ? getBackdropUrl(company.logo_path, "w300")
                          : "https://play-lh.googleusercontent.com/7cIIPlWm4m7AGqVpEsIfyL-HW4cQla4ucXnfalMft1TMIYQIlf2vqgmthlZgbNAQoaQ=w600-h300-pc0xffffff-pd"
                      }
                      fallback={
                        <div className="bg-gray-700 w-full h-full rounded-full" />
                      }
                    />
                  </PopoverTrigger>
                  <PopoverContent className="bg-zinc-900 text-white px-3 py-2 rounded-xl shadow-lg border border-zinc-700">
                    <p className="text-sm font-semibold">{company.name}</p>
                  </PopoverContent>
                </Popover>
              ))}
            </AvatarGroup>
          </section>

          <section className="mt-4">
            <MovieTrailer movieId={movie.id} />
          </section>

          {commentsLoading ? (
            <p>Loading</p>
          ) : (
            <CommentsSection movieId={movieId} comments={comments!} />
          )}
        </div>

        <div>
          <MovieRatingCard
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
          />
        </div>
      </div>
      <section className="mt-8">
        <h1 className="text-3xl font-bold mt-4 mb-2">Similar Movies</h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {similarMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              imgUrl={movie.poster_path ? movie.poster_path : ""}
              title={movie.title!}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoviePage;
