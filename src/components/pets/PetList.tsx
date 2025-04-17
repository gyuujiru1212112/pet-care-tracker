"use client";

import { deletePet, getPets } from "@/lib/pet-actions";
import { Pet } from "@prisma/client";
import { useEffect, useState } from "react";
import PetProfileCard from "@/components/pets/PetProfileCard";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import LoadingError from "@/components/LoadingError";

interface PetListProps {
  userId: string;
}

export default function PetList({ userId }: PetListProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function fetchPets() {
    const res = await getPets(userId);
    if (res.error) {
      setError(res.error);
    } else {
      setPets(res.pets);
    }
  }

  const handleDelete = async (petId: string) => {
    try {
      const res = await deletePet(petId);
      //if (res.ok) {
      setPets(
        pets.filter((p) => {
          return p.id !== petId;
        })
      );
      //}
    } catch {
      console.log("Error deleting pet");
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (error) {
    return <LoadingError />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pets.length > 0 &&
        pets.map((pet) => (
          <PetProfileCard pet={pet} key={pet.id} onDeletePet={handleDelete} />
        ))}

      {/* Add Pet Card */}
      {/* todo height adjusting */}
      <Link href="/pets/new">
        <Card className="flex items-center justify-center cursor-pointer hover:bg-muted rounded-lg">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Plus className="w-6 h-6 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Add Pet</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
