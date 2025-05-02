import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pets = await prisma.pet.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "asc" },
    });

    if (!pets) {
      return NextResponse.json({ error: "Pets not found" }, { status: 404 });
    }

    return NextResponse.json(pets);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch pets" },
      { status: 500 }
    );
  }
}
