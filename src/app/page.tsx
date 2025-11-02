"use client";
import MovieCard from "@/components/common/movieCard";
import NowPlayingBigCard from "@/components/ui/nowPlayingBigCard";
import { useMovieStore } from "@/store/movie.store";

export default function Home() {
  const { NowPlaying, popular, upcoming, topRated } = useMovieStore();
  const FisrtNowPlaying = NowPlaying.data[0];

  if (
    !FisrtNowPlaying ||
    popular.loading ||
    NowPlaying.loading ||
    upcoming.loading ||
    topRated.loading
  )
    return <p>Loading</p>;
  return (
    <div className="container text-white">
      <section>
        <NowPlayingBigCard
          id={FisrtNowPlaying.id}
          bgPath={FisrtNowPlaying.backdrop_path}
          title={FisrtNowPlaying.title}
          movieDopInfo={{
            adult: FisrtNowPlaying.adult,
            release_date: FisrtNowPlaying.release_date,
            budget: 0,
            genres: [],
            original_language: FisrtNowPlaying.original_language,
          }}
        />
      </section>
      <section className="mt-8">
        <h1 className="font-bold text-2xl mb-2">Trending Now</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {popular.data.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              imgUrl={movie.poster_path!}
              title={movie.title!}
            />
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h1 className="font-bold text-2xl mb-2">Upcoming</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {upcoming.data.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              imgUrl={movie.poster_path!}
              title={movie.title!}
            />
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h1 className="font-bold text-2xl mb-2">Top rated</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {topRated.data.map((movie) => (
            <MovieCard
              id={movie.id}
              key={movie.id}
              imgUrl={movie.poster_path!}
              title={movie.title!}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
