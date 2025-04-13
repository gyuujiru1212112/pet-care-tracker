"use client";
// add pet page
import Headerbar from "@/components/Headerbar";
import PetForm from "@/components/pets/PetForm";
import { createPet } from "@/lib/pet-actions";
import { useRouter } from "next/navigation";
import { startTransition, useState, useTransition } from "react";

export default function AddPet() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        // Call createPaper Server Action
        console.log("Is Pending: ", isPending);

        //console.log("Create pet with user: ", session.user.id);
        await createPet(formData);
        // Set success message and redirect to "/" after 3 seconds
        setMessage("Pet created successfully");
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (error) {
        // Set error message
        setMessage(
          error instanceof Error ? error.message : "Error creating pet"
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      {/* Headerbar */}
      <PetForm action={handleAction} pet={null} />
      {message && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}
