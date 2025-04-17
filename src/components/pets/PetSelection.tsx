import { Pet } from "@prisma/client";
import { useRouter } from "next/navigation";
import PetIcon from "@/components/pets/PetIcon";
import { Suspense } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

interface PetsSectionProps {
  selectedPet: Pet | null;
  pets: Pet[];
}

export default function PetSelection({ pets, selectedPet }: PetsSectionProps) {
  const router = useRouter();

  function handleSelection(petId: string): void {
    console.log("Push to pet", petId);
    router.push(`/pets/${petId}`);
  }

  return (
    <div className="p-4">
      <Suspense fallback={<p>Loading pet selection...</p>}>
        {pets.length === 0 ? (
          <p>No Pets</p>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {/* Selectable pets */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src={selectedPet?.profilePictureUrl ?? "/default-pet.png"}
                alt="Pet Image"
                className="w-32 h-32 object-cover rounded-full border-2 border-primary"
              />
              <p className="text-xl font-semibold">{selectedPet?.name}</p>
            </div>
            <hr className="w-1/2 border-t border-gray-300" />
            <Label className="text-sm font-medium mt-4">
              🐾 Select a pet to switch
            </Label>

            {/* Other Pets */}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {pets
                .filter((p) => p.id !== selectedPet?.id)
                .map((pet) => (
                  <div
                    key={pet.id}
                    className="flex flex-col items-center space-y-1"
                  >
                    <Button
                      onClick={() => handleSelection(pet.id)}
                      variant="ghost"
                      className="p-0 w-16 h-16 rounded-full overflow-hidden shadow-md hover:scale-105 transition-transform"
                    >
                      <PetIcon pet={pet} />
                    </Button>
                    <span className="text-sm text-center">{pet.name}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}
