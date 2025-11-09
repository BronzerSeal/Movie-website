import bcryptjs from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schema/zod";
import { getUserFromDb } from "@/utils/user";
import prisma from "@/utils/prisma";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      name: "Account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email и пароль обязательны");
          }

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            throw new Error("Неверный ввод данных");
          }

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Неверный ввод данных");
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session: paramsSession }) {
      if (user) {
        token.id = user.id;
      }

      if (trigger === "update" && paramsSession?.user) {
        token = {
          ...token,
          ...paramsSession.user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            about: true,
            image: true,
            name: true,
            favouriteMovies: true,
          },
        });
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (session.user as any).id = token.id;
        (session.user as any).about = dbUser?.about || null;
        (session.user as any).image =
          dbUser?.image || (token as any).image || null;
        (session.user as any).name =
          dbUser?.name || (token as any).name || null;
        (session.user as any).favouriteMovies =
          dbUser?.favouriteMovies || (token as any).favouriteMovies || [];
        /* eslint-enable @typescript-eslint/no-explicit-any */
      }

      return session;
    },
  },
});
