"use client";
import LoadingMessage from "@/components/LoadingMessage";
// add pet page
import PetForm from "@/components/pets/PetForm";
import PetProfileHeaderbar from "@/components/pets/PetProfileHeadBar";
import { createPet } from "@/lib/pet-actions";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

export default function AddPet() {
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    try {
      // Call createPet Server Action
      await createPet(formData);
      // Set success message and redirect to "/dashboard"
      toast.message("Pet created successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      // Set error message
      toast.error(
        error instanceof Error ? error.message : "Error creating pet"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      {/* Headerbar */}
      <PetProfileHeaderbar />
      <Suspense fallback={<LoadingMessage message="Loading add pet page..." />}>
        {/* Pet form */}
        <PetForm title="Add Pet" action={handleAction} pet={null} />
      </Suspense>
    </div>
  );
}
