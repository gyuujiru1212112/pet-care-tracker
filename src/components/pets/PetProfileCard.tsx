"use client";

import { Pet } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useState } from "react";

interface PetProfileCardProps {
  pet: Pet;
  onDeletePet: (id: string) => Promise<void>;
}

export default function PetProfileCard({
  pet,
  onDeletePet,
}: PetProfileCardProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  function handleDelete(): void {
    try {
      console.log("Delete pet");
      setMessage("");
      onDeletePet(pet.id);
    } catch {
      setMessage("Error deleting pet");
    }
  }

  function handleEdit(): void {
    router.push(`/pets/${pet.id}/edit`);
  }

  return (
    <div className="relative group">
      {/* Edit and Delete buttons */}
      <div className="absolute right-2 top-2 z-50">
        <div className="flex gap-2">
          {message && (
            <p className="text-destructive text-lg bg-background">{message}</p>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-background"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-background hover:bg-destructive hover:text-destructive-foreground"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>

      <Link href={`/pets/${pet.id}`} className="block transition-all">
        <Card className="relative h-full transition-all hover:shadow-md hover:-translate-y-1">
          <CardContent className="flex flex-col items-center p-4">
            <img
              src={pet.profilePictureUrl || "/default-pet.png"}
              alt={pet.name}
              width={80}
              height={80}
              className="rounded-full object-cover w-20 h-20"
            />
            <h2 className="mt-3 text-3xl font-semibold">{pet.name}</h2>
            {pet.birthDate && (
              <p className="text-lg text-muted-foreground">
                Born: {format(pet.birthDate, "yyyy-MM-dd")}
              </p>
            )}
            <div className="mt-4 flex items-center justify-center">
              <span className="font-semibold text-sm text-primary transition-all">
                Tap to View
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
