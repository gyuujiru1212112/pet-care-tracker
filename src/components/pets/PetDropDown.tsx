import { Pet } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import LoadingError from "@/components/LoadingError";

interface PetDropDownProps {
  selectedPet: Pet | null;
  pets: Pet[];
}

export default function PetDropDown({ pets, selectedPet }: PetDropDownProps) {
  const router = useRouter();

  function handleSelection(petId: string) {
    console.log("Push to pet", petId);
    router.push(`/pets/${petId}`);
  }

  return (
    <div className="p-4">
      <Suspense fallback={<p>Loading pet selection...</p>}>
        {pets.length === 0 ? (
          <LoadingError message="No Pets" />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {selectedPet ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={selectedPet?.profilePictureUrl ?? "/default-pet.png"}
                  alt="Pet Image"
                  className="w-16 h-16 object-cover rounded-full border-2 border-primary"
                />
                <p className="text-xl font-semibold">{selectedPet?.name}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src="/default-pet.png"
                  alt="Pet Image"
                  className="w-16 h-16 object-cover rounded-full border-2 border-primary"
                />
                <p className="text-xl font-semibold text-destructive text-wrap">
                  No Pet Selected. Please refresh the page.
                </p>
              </div>
            )}

            {/* Selectable pets */}
            {pets.filter((p) => p.id !== selectedPet?.id).length > 0 && (
              <Select onValueChange={handleSelection}>
                <SelectTrigger className="w-[200px] bg-gray-100">
                  <SelectValue placeholder="Select a pet to switch" />
                </SelectTrigger>
                <SelectContent>
                  {pets
                    .filter((p) => p.id !== selectedPet?.id)
                    .map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </Suspense>
    </div>
  );
}
