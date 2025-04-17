import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay, subDays } from "date-fns";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);
  const withLogs = url.searchParams.get("withLogs") === "true";

  const beforeStr = url.searchParams.get("before");
  const daysStr = url.searchParams.get("days");

  const beforeDate = beforeStr ? new Date(beforeStr) : null;
  const days = daysStr ? parseInt(daysStr) : 3;

  try {
    let pet = null;
    if (withLogs) {
      if (beforeDate && days) {
        const fromDate = startOfDay(subDays(beforeDate, days - 1));
        const toDate = endOfDay(beforeDate);

        pet = await prisma.pet.findUnique({
          where: { id },
          include: {
            logs: {
              where: {
                date: {
                  gte: fromDate,
                  lte: toDate,
                },
              },
              orderBy: { date: "desc" },
            },
          },
        });
      } else {
        pet = await prisma.pet.findUnique({
          where: { id },
          include: {
            logs: {
              orderBy: { date: "desc" },
            },
          },
        });
      }
    } else {
      pet = await prisma.pet.findUnique({
        where: { id },
      });
    }

    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch pet with(out) logs" },
      { status: 500 }
    );
  }
}
