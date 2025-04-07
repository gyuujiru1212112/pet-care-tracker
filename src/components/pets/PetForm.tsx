import { Pet } from "@prisma/client";

interface PetFormProps {
  pet: Pet | null;
  action: (formData: FormData) => void;
}

export default function PetForm({ action }: PetFormProps) {}
