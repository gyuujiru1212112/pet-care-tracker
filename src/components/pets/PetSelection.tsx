import { Pet } from "@prisma/client";
import router from "next/navigation";
import PetIcon from "@/components/pets/PetIcon";
import { Suspense } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PetsSectionProps {
  selectedPet: Pet | null;
  pets: Pet[];
}

export default function PetSelection({ pets, selectedPet }: PetsSectionProps) {
  function handleSelection(petId: string): void {}

  return (
    <div className="p-4">
      {/* Pet list */}
      <Suspense fallback="{<p>Loading pet selection...</p>}">
        {pets.length === 0 ? (
          <p>No Pets</p>
        ) : (
          <div>
            <img
              src={selectedPet?.profilePictureUrl ?? "/default-pet.png"}
              alt="Pet Image"
              className="w-full h-full object-cover rounded-full"
            />

            <p className="justify-center items-center">{selectedPet?.name}</p>
            <Label className="text-sm font-medium mb-2 block">
              🐾 Select a pet to switch
            </Label>
            <RadioGroup
              value={selectedPet?.id}
              onValueChange={handleSelection}
              className="flex flex-wrap gap-3"
            >
              {Object.entries(pets.filter((p) => p.id != selectedPet?.id)).map(
                ([id, pet]) => (
                  <div key={id} className="flex flex-col items-center">
                    {/* Hidden radio input */}
                    <RadioGroupItem
                      value={id}
                      id={`pet-${id}`}
                      className="sr-only peer"
                    />

                    {/* Label as visual representation */}
                    <label
                      htmlFor={`pet-${id}`}
                      className={cn(
                        "cursor-pointer rounded-full overflow-hidden border-2 transition-all",
                        "peer-checked:ring-2 peer-checked:ring-primary peer-checked:border-primary"
                      )}
                    >
                      <PetIcon pet={pet} />
                    </label>

                    <span className="text-sm mt-1">{pet.name}</span>
                  </div>
                )
              )}
            </RadioGroup>
          </div>
        )}
      </Suspense>
    </div>
  );
}
