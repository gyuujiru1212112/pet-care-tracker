"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import Timeline from "@/components/Timeline";
import prisma from "@/lib/prisma";
import PetIcon from "@/components/pets/PetIcon";
import { notFound } from "next/navigation";

// Selected pet timeline page
async function getLogs(petId: string) {
  try {
    const today = new Date();
    const twoDaysEarlier = new Date(today);
    twoDaysEarlier.setDate(today.getDate() - 2);

    const logs = await prisma.log.findMany({
      where: {
        petId: petId,
        date: {
          gte: twoDaysEarlier,
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return { logs, error: null };
  } catch {
    return { logs: [], error: "Error loading logs" };
  }
}

export default function PetPage() {
  const { id } = useParams();

  // fetch pet
  // const idStr = id as string;
  // const pet = await prisma.pet.findUnique({
  //   where: {
  //     id: idStr,
  //   },
  // });
  // if (!pet) {
  //   return notFound();
  // }

  // fetch logs
  // const { logs, error } = await getLogs(idStr);
  // if (error) {
  //   return <p className="text-sm">{error}</p>;
  // }

  return (
    <div>
      <div>{/* <PetIcon pet={pet} /> */}</div>
      <div>
        {/* <Suspense fallback={<p>Loading...</p>}> */}
        {/* <Timeline logs={logs} /> */}
        something
        {/* </Suspense> */}
      </div>
    </div>
  );
}
