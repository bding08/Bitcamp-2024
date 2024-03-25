import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    // signOut: "/sign-out", // implement later
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          console.log("could not find user");
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //   console.log(token, user);
      if (user) {
        return {
          ...token,
          user: user.username,
        };
      } else {
        console.log("user is undefined");
      }

      // console.log("token:");
      // console.log(token);
      return token;
    },
    async session({ session, token }) {
      //   console.log("session");
      //   console.log({
      //     ...session,
      //     user: {
      //       ...session.user,
      //       username: token.user,
      //     },
      //   });

      return {
        ...session,
        user: {
          ...session.user,
          username: token.user,
        },
      };
    },
  },
};
