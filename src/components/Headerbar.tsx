import { Home } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

interface HeaderbarProps {
  title: string;
}

export default function Headerbar({ title }: HeaderbarProps) {
  return (
    <div className="fixed top-0 left-0 w-full px-4 sm:px-10 z-50 bg-white shadow-md opacity-90">
      <div className="flex items-center justify-between py-3">
        {/* Home Icon */}
        <Link href="/dashboard" className="flex-shrink-0 ">
          <Home className="h-5 w-5 hover:bg-gray-300" />
        </Link>

        {/* Title */}
        <h1 className="text-lg sm:text-2xl font-semibold text-black text-center flex-1">
          {title}
        </h1>

        {/* Logout Button */}
        <div className="flex-shrink-0 flex items-center">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
