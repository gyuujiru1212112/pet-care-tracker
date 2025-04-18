import { Pet } from "@prisma/client";

interface PetIconProps {
  pet: Pet;
}

export default function PetIcon({ pet }: PetIconProps) {
  return (
    <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden bg-white shadow-md">
      <img
        src={pet.profilePictureUrl || "/default-pet.png"}
        alt="Pet Image"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
