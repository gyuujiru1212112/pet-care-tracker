"use client";
// add pet page
import PetForm from "@/components/pets/PetForm";
import PetProfileHeaderbar from "@/components/pets/PetProfileHeadBar";
import { createPet } from "@/lib/pet-actions";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

export default function AddPet() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    try {
      // Call createPet Server Action
      await createPet(formData);
      // Set success message and redirect to "/" after 2 seconds
      setMessage("Pet created successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      // Set error message
      setMessage(error instanceof Error ? error.message : "Error creating pet");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      {/* Headerbar */}
      <PetProfileHeaderbar />
      <Suspense fallback="{<p>Loading add pet page...</p>}">
        <PetForm title="Add Pet" action={handleAction} pet={null} />
        {message && <p className="text-sm text-destructive">{message}</p>}
      </Suspense>
    </div>
  );
}
