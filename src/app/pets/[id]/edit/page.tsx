"use client";
import LoadingMessage from "@/components/LoadingMessage";
import PetForm from "@/components/pets/PetForm";
import PetProfileHeaderbar from "@/components/pets/PetProfileHeadBar";
import { editPet } from "@/lib/pet-actions";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function EditPet() {
  const [pet, setPet] = useState(null);
  const router = useRouter();
  const { id } = useParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const idStr = id as string;
    if (idStr) {
      // fetch pets/id
      fetch(`/api/pets/${idStr}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error("Pet not found.");
          } else {
            setPet(data);
          }
        })
        .catch(() => {
          toast.error("Error fetching pet data.");
        });
    }
  }, [id]);

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const idStr = id as string;
        if (idStr) {
          await editPet(formData, idStr);
          // Set success message and redirect to "/dashboard"
          toast.message("Pet edited successfully");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
      } catch {
        toast.error("Error editing pet.");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <PetProfileHeaderbar />
      <Suspense fallback={<LoadingMessage message="Loading edit page..." />}>
        {!pet ? (
          <LoadingMessage message="Loading pet data..." />
        ) : (
          <>
            {/* Pet form */}
            <PetForm
              title="Edit Pet"
              action={handleAction}
              pet={pet}
              isPending={isPending}
            />
          </>
        )}
      </Suspense>
    </div>
  );
}
