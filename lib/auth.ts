import { AuthOptions } from "next-auth";
import CredendialsProvider from "next-auth/providers/credentials";
import { api } from "./api";

export const authOptions: AuthOptions = {
  providers: [
    CredendialsProvider({
      credentials: {
        email: { type: "email", placeholder: "enter your email" },
        password: { type: "password", placeholder: "enter your password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await api.auth.login({
          email: credentials.email,
          password: credentials.password,
        });

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.token = token.token as string;

      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
