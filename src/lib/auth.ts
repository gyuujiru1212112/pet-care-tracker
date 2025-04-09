import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "./zod";
import { ZodError } from "zod";
import { getUserFromDb, saltAndHash } from "@/utils/db";
import { compare } from "bcrypt-ts";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          console.log(password);
          // logic to verify if the user exists
          user = await getUserFromDb(email);

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }

          let hashedPassword = saltAndHash(password);
          console.log(user.password);
          console.log(hashedPassword);
          let passwordsMatch = await compare(hashedPassword, user.password!);
          if (!passwordsMatch) throw new Error("Invalid password.");

          return user as any;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
});
