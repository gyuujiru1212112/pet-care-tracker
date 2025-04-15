import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  /* ! await needed for warning ! */
  const { id } = await context.params;
  const url = new URL(request.url);
  const withLogs = url.searchParams.get("withLogs") === "true";

  try {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: withLogs ? { logs: { orderBy: { date: "desc" } } } : {},
    });

    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pet with(out) logs" },
      { status: 500 }
    );
  }
}
