"use client";
// edit pet page

import PetForm from "@/components/pets/PetForm";
import PetProfileHeaderbar from "@/components/pets/PetProfileHeadBar";
import { editPet } from "@/lib/pet-actions";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function EditPet() {
  const [pet, setPet] = useState(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const idStr = id as string;
    if (idStr) {
      fetch(`/api/pets/${idStr}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage("Pet not found");
          } else {
            setPet(data);
          }
        })
        .catch(() => {
          setMessage("Error fetching pet data");
        });
    }
  }, [id]);

  const handleAction = async (formData: FormData) => {
    try {
      const idStr = id as string;
      if (idStr) {
        await editPet(formData, idStr);
        // Set success message and redirect to "/" after 2 seconds

        setMessage("Pet edited successfully");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (error) {
      setMessage("Error editing pet");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <PetProfileHeaderbar />
      <Suspense fallback="{<p>Loading edit pet page...</p>}">
        {!pet ? (
          <p>Loading pet data...</p>
        ) : (
          <>
            <PetForm title="Edit Pet" action={handleAction} pet={pet} />
            {message && <p className="text-sm text-destructive">{message}</p>}
          </>
        )}
      </Suspense>
    </div>
  );
}
