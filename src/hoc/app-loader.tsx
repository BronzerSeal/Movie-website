"use client";
import { movieService } from "@/services/movieService";
import { useAuthStore } from "@/store/auth.store";
import { useMovieStore } from "@/store/movie.store";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: IProps) => {
  const { data: session, status } = useSession();
  const { setAuthState } = useAuthStore();
  const pathname = usePathname();
  const {
    setNowPlaying,
    setPopular,
    setUpcoming,
    setTopRated,
    setLoading,
    setError,
  } = useMovieStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (pathname !== "/") return;

    const loadMovies = async () => {
      try {
        setLoading("NowPlaying", true);
        const data = await movieService.getNowPlayingFilms();
        setNowPlaying(data.results);
      } catch (err) {
        setError("NowPlaying", "Ошибка загрузки");
      } finally {
        setLoading("NowPlaying", false);
      }
      //--------------------------------------------------------------------
      try {
        setLoading("popular", true);
        const data = await movieService.getPopularFilms();
        setPopular(data.results.slice(1, 7));
      } catch (err) {
        setError("popular", "Ошибка загрузки");
      } finally {
        setLoading("popular", false);
      }
      //--------------------------------------------------------------------
      try {
        setLoading("upcoming", true);
        const data = await movieService.getUpcomingFilms();
        setUpcoming(data.results.slice(1, 7));
      } catch (err) {
        setError("upcoming", "Ошибка загрузки");
      } finally {
        setLoading("upcoming", false);
      }
      //--------------------------------------------------------------------
      try {
        setLoading("topRated", true);
        const data = await movieService.getTopRatedFilms();
        setTopRated(data.results.slice(1, 7));
      } catch (err) {
        setError("topRated", "Ошибка загрузки");
      } finally {
        setLoading("topRated", false);
      }
    };
    loadMovies();
  }, [
    pathname,
    setLoading,
    setNowPlaying,
    setPopular,
    setUpcoming,
    setTopRated,
    setError,
  ]);

  return <>{children}</>;
};

export default AppLoader;
