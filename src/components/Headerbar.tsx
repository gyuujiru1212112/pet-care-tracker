import { Home } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

interface HeaderbarProps {
  title: string;
  email: string | null;
}

export default function Headerbar({ title, email }: HeaderbarProps) {
  return (
    <div className="fixed top-0 left-0 w-full px-4 sm:px-10 z-50 bg-white shadow-md opacity-90">
      <div className="flex items-center justify-between py-3">
        {/* Home Icon */}
        <Link href="/dashboard" className="flex-shrink-0">
          <Home className="h-5 w-5" />
        </Link>

        {/* Title */}
        <h1 className="text-lg sm:text-2xl font-semibold text-black text-center flex-1">
          {title}
        </h1>

        {/* Logout Button */}
        <div className="flex-shrink-0 flex items-center">
          <p className="text-sm">{email}</p>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
