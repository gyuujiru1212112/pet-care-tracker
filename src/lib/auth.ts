import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "./zod";
import { ZodError } from "zod";
import { getUserFromDb } from "@/utils/db";
import { compare } from "bcrypt-ts";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const email = credentials.email as string;
          if (!email) {
            throw new Error("Email is required.");
          }

          const password = credentials.password as string;
          if (!password) {
            return new Error("Password is required.");
          }

          // logic to verify if the user exists
          user = await getUserFromDb(email);
          console.log("User: ", user);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          let passwordsMatch = await compare(password, user.password!);
          if (!passwordsMatch) throw new Error("Invalid password.");

          console.log("Password is correct");

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            console.log("ZodError: ", error.errors);
          }

          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("token user id: ", user.id);
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session user id: ", session.userId);
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
