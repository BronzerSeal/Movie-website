"use client";
import { movieService } from "@/services/movieService";
import { movieVideo } from "@/types/movie.types";
import { useEffect, useState } from "react";

export default function MovieTrailer({ movieId }: { movieId: number }) {
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      const res = await movieService.getMovieVideoById(movieId);
      const trailer = res.results.find(
        (v: movieVideo) => v.site === "YouTube" && v.type === "Trailer"
      );
      if (trailer) setVideoKey(trailer.key);
    }
    fetchVideo();
  }, [movieId]);

  if (!videoKey) return <p>No trailer available</p>;

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
        title="Trailer"
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}
