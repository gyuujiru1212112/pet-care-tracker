import Headerbar from "@/components/Headerbar";
import PetProfileCard from "@/components/pets/PetProfileCard";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Pet } from "@prisma/client";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

async function getPets(): Promise<{ pets: Pet[]; error: string | null }> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/pets`);
    const pets = await res.json();

    return { pets, error: null };
  } catch {
    return { pets: [], error: "Error loading pets" };
  }
}

async function PetsSection() {
  const { pets, error } = await getPets();

  if (error) {
    return <p className="text-sm">{error}</p>;
  }

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
  return (
    <div className="min-h-screen flex flex-col bg-accent">
      {/* Headerbar */}
      <Headerbar title="Dashboard" />
      <section className="pt-20">
        <div>
          <div className="w-full p-10">
            {/* Grid of pet cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Suspense fallback={<p>Loading pets...</p>}>
                <PetsSection />
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
