export const runtime = "nodejs";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderbarProps {
  title: string;
  //   username: string;
}

export default function Headerbar({ title }: HeaderbarProps) {
  return (
    <div className="fixed top-0 left-0 w-full px-4 sm:px-10 z-50 bg-white shadow-md">
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
          {/* <p className="mr-2 text-sm sm:text-base">{username}</p> */}
          <Button
            className="text-sm sm:text-base px-2 sm:px-4"
            variant="ghost"
            onClick={async () => {
              "use server";
              await signOut();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
