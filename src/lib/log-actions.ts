"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isTag } from "@/constants/tags";

async function processLog() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

export async function addLog(
  date: Date,
  log: string,
  tag: string,
  petId: string
) {
  const userId = await processLog();

  if (!log || log.trim() === "") {
    throw new Error("Log is missing");
  }

  if (!tag) {
    throw new Error("Tag is missing");
  }

  if (!isTag(tag)) {
    throw new Error("Tag is not defined");
  }

  await prisma.log.create({
    data: {
      description: log,
      date: date,
      tag: tag,
      pet: {
        connect: { id: petId },
      },
      user: {
        connect: { id: userId },
      },
    },
  });
}

export async function deleteLog(logId: string) {
  await processLog();

  await prisma.log.delete({
    where: {
      id: logId,
    },
  });
}
