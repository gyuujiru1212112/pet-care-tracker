"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function processPetData(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const petName = formData.get("name") as string;
  if (!petName) {
    throw new Error("Pet name is missing");
  }

  const birthDateStr = formData.get("birthDate") as string;
  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid birth date");
  }

  const imageUrl = formData.get("imageUrl") as string;

  return {
    userId: session.user.id,
    name: petName,
    birthDate,
    profilePictureUrl: imageUrl.trim() === "" ? null : imageUrl,
  };
}

export async function createPet(formData: FormData) {
  const { userId, name, birthDate, profilePictureUrl } = await processPetData(
    formData
  );

  await prisma.pet.create({
    data: {
      name,
      birthDate,
      profilePictureUrl,
      user: {
        connect: { id: userId },
      },
    },
  });
}

export async function editPet(formData: FormData, petId: string) {
  const { name, birthDate, profilePictureUrl } = await processPetData(formData);

  await prisma.pet.update({
    where: { id: petId },
    data: {
      name,
      birthDate,
      profilePictureUrl,
    },
  });
}
