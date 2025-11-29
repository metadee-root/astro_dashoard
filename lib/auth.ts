import { AuthOptions } from "next-auth";
import CredendialsProvider from "next-auth/providers/credentials";
import { api } from "./api";
import { Status } from "@/types/next-auth";

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

        return {
          ...user,
          image: user.profileImage,
          status: user.status as Status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (trigger === "update") {
        if (session.name) token.name = session.name;
        if (session.token) token.token = session.token;
        if (session.status) token.status = session.status;
      }
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      session.user.status = token.status as Status;

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
