import { Pet } from "@prisma/client";

interface PetFormProps {
  pet: Pet | null;
  action: (formData: FormData) => void;
}

export default function PetForm({ action, pet }: PetFormProps) {
    return (
        <form action={action} className="md:items-center">
            <div>
                
            </div>


        </form>
    )
}
