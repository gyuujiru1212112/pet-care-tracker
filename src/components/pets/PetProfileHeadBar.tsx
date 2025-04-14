import { Home } from "lucide-react";
import Link from "next/link";

export default function PetProfileHeaderbar() {
  return (
    <div className="fixed top-0 left-0 w-full px-4 sm:px-10 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between py-3">
        {/* Home Icon */}
        <Link href="/dashboard" className="flex-shrink-0">
          <Home className="h-5 w-5" />
        </Link>

        {/* Title */}
        <h1 className="text-lg sm:text-2xl font-semibold text-black text-center flex-1">
          Pet Profile
        </h1>
      </div>
    </div>
  );
}
