"use client";

import { Pet } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PetProfileCardProps {
  pet: Pet;
}

export default function PetProfileCard({ pet }: PetProfileCardProps) {
  function handleDelete(): void {
    console.log("Delete pet");
  }

  function handleEdit(): void {
    console.log("Edit pet");
  }

  return (
    <div className="relative group">
      {/* Edit and Delete buttons */}
      <div className="absolute right-2 top-2 z-50">
        <div className="flex gap-2">
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
            <p className="text-lg text-muted-foreground">{pet.breed}</p>
            {pet.birthDate && (
              <p className="text-lg text-muted-foreground">
                Born: {new Date(pet.birthDate).toLocaleDateString()}
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
