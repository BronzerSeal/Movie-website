// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      about: string | null;
      favouriteMovies: string[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    about?: string | null;
    favouriteMovies?: string[];
  }
}
