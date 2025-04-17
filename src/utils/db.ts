import { prisma } from "@/lib/prisma";
import { genSaltSync, hashSync } from "bcrypt-ts";

export function getUserFromDb(email: string) {
  const user = prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function createUser(email: string, password: string) {
  console.log("Creating user", email, password);
  const hashedPassword = saltAndHash(password);

  await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
}

export function saltAndHash(password: string) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}
