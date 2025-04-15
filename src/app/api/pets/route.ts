import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pets = await prisma.pet.findMany();
    if (!pets) {
      return NextResponse.json({ error: "Pets not found" }, { status: 404 });
    }

    return NextResponse.json(pets);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pets" },
      { status: 500 }
    );
  }
}
