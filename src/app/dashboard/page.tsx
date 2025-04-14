import Headerbar from "@/components/Headerbar";
import PetProfileCard from "@/components/pets/PetProfileCard";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";

async function getPets(userId: string) {
  try {
    console.log("Get Pets, user id is: ", userId);
    if (!userId) {
      throw new Error("User id is null");
    }
    const pets = await prisma.pet.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "asc" },
    });

    return { pets, error: null };
  } catch {
    return { pets: [], error: "Error loading pets" };
  }
}

interface PetsSectionProps {
  userId: string;
}

async function PetsSection({ userId }: PetsSectionProps) {
  const { pets, error } = await getPets(userId);

  if (error) {
    return <p className="text-sm">{error}</p>;
  }

  console.log("Get Pets", pets);
  if (pets.length === 0) return <></>;

  return (
    <div className="space-y-4">
      {pets.map((pet) => (
        <PetProfileCard pet={pet} key={pet.id} />
      ))}
    </div>
  );
}

export default async function Dashboard() {
  const session = await auth();
  if (!session || !session.user || !session.user?.id) return unauthorized;

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      {/* Headerbar */}
      <Headerbar title="Dashboard" email={session.user.email ?? "Guest"} />
      <section className="pt-20">
        <div>
          <div className="w-full p-10">
            {/* Grid of pet cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Suspense fallback={<p>Loading pets...</p>}>
                <PetsSection userId={session.user.id} />
              </Suspense>

              {/* Add Pet Card */}
              <Link href="/pets/new">
                <Card className="flex items-center justify-center cursor-pointer hover:bg-muted rounded-lg">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Add Pet
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
