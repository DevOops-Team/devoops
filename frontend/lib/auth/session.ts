import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  createUserIfNotExists,
  findUser,
} from "@/repositories/user.repository";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
      },

      async authorize(credentials) {
        const username = String(credentials?.username ?? "").trim();

        if (!username) {
          return null;
        }

        await createUserIfNotExists(username, 2);

        const user = await findUser(username);

        if (!user || user.disabled) {
          return null;
        }

        return {
          id: user.username,
          username: user.username,
          role: user.role,
          quota: user.quota,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.quota = user.quota;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.quota = token.quota;
      }

      return session;
    },
  },
};
