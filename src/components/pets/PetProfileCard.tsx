"use client";

import { Pet } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";

interface PetProfileCardProps {
  pet: Pet;
  onDeletePet: (id: string) => Promise<void>;
}

export default function PetProfileCard({
  pet,
  onDeletePet,
}: PetProfileCardProps) {
  const router = useRouter();

  function handleDelete(): void {
    try {
      console.log("Delete pet");
      onDeletePet(pet.id);
      toast.message("Pet profile deleted!");
    } catch {
      toast.error("Error deleting pet.");
    }
  }

  function handleEdit(): void {
    router.push(`/pets/${pet.id}/edit`);
  }

  return (
    <div className="relative group h-full">
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-background hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this pet profile and all of its logs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDelete();
                  }}
                >
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Link href={`/pets/${pet.id}`} className="block transition-all">
        <Card className="relative min-h-[250px] transition-all hover:shadow-md hover:-translate-y-1">
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
