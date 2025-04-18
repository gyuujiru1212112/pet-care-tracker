import { Pet } from "@prisma/client";
import { useRouter } from "next/navigation";
import PetIcon from "@/components/pets/PetIcon";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoadingError from "@/components/LoadingError";

interface PetsSectionProps {
  selectedPet: Pet | null;
  pets: Pet[];
}

export default function PetSelection({ pets, selectedPet }: PetsSectionProps) {
  const router = useRouter();

  function handleSelection(petId: string) {
    console.log("Push to pet", petId);
    router.push(`/pets/${petId}`);
  }

  return (
    <div className="p-4">
      {pets.length === 0 ? (
        <LoadingError />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {selectedPet ? (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={selectedPet?.profilePictureUrl ?? "/default-pet.png"}
                alt="Pet Image"
                className="w-32 h-32 object-cover rounded-full border-2 border-primary"
              />
              <p className="text-xl font-semibold">{selectedPet?.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/default-pet.png"
                alt="Pet Image"
                className="w-32 h-32 object-cover rounded-full border-2 border-primary"
              />
              <p className="text-xl font-semibold text-destructive text-wrap">
                No Pet Selected. Please refresh the page.
              </p>
            </div>
          )}
          {/* Selectable pets */}
          {pets.filter((p) => p.id !== selectedPet?.id).length > 0 && (
            <div>
              <hr className="w-full border-t border-gray-300" />
              <Label className="text-sm font-medium mt-4 justify-center">
                🐾 Select a pet to switch 🐾
              </Label>
              <div className="flex flex-wrap justify-center gap-3 mt-2 pt-2">
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
                        className="p-0 w-22 h-22 rounded-full overflow-hidden shadow-md hover:scale-110 transition-transform"
                      >
                        <PetIcon pet={pet} />
                      </Button>
                      <span className="text-sm text-center">{pet.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
