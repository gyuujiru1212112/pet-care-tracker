import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  /* ! await needed for warning ! */
  const { id } = await context.params;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pet" }, { status: 500 });
  }
}
