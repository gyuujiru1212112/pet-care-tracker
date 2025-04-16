import { Pet } from "@prisma/client";

interface PetIconProps {
  pet: Pet;
}

export default function PetIcon({ pet }: PetIconProps) {
  return (
    <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
      <img
        src={pet.profilePictureUrl || "/default-pet.png"}
        alt="Pet Image"
        className="w-12 h-12 rounded-full"
      />
    </div>
  );
}
