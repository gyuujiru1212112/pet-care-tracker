"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createPet(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const petName = formData.get("name") as string;
  console.log("Pet name: ", petName);
  if (!petName) {
    throw new Error("Pet name is missing");
  }

  const birthDateStr = formData.get("birthDate") as string;
  const birthDate = new Date(birthDateStr);
  console.log("Pet birthdate: ", birthDate);

  const imageUrl = formData.get("imageUrl") as string;
  console.log("Pet imageUrl: ", imageUrl);
  if (imageUrl.trim() === "") {
    await prisma.pet.create({
      data: {
        name: petName,
        birthDate,
        user: {
          connect: { id: session.user.id },
        },
      },
    });
  } else {
    await prisma.pet.create({
      data: {
        name: petName,
        birthDate: birthDate,
        profilePictureUrl: imageUrl,
        user: {
          connect: { id: session.user.id },
        },
      },
    });
  }
}

export async function editPet(formData: FormData) {}
