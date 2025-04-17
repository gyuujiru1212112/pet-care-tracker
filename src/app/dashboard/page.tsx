import Headerbar from "@/components/Headerbar";
import PetList from "@/components/pets/PetList";
import { auth } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";

export default async function Dashboard() {
  const session = await auth();
  if (!session || !session.user || !session.user?.id) return unauthorized;

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      {/* Headerbar */}
      <Headerbar title="Dashboard" />
      <section className="pt-20">
        <div>
          <div className="w-full p-10">
            {/* Grid of pet cards */}
            <Suspense fallback={<p>Loading pets...</p>}>
              <PetList userId={session.user.id} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
