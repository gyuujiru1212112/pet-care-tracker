import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

interface HeaderbarProps {
  title: string;
}

export default function Headerbar({ title }: HeaderbarProps) {
  return (
    <div className="fixed top-0 left-0 w-full pl-10 pr-10 z-50 bg-white">
      <div className="flex justify-between items-center py-4">
        {/* Home Icon Link */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Home className="h-5 w-5" />
          </Link>
        </div>

        {/* Title - Centered */}
        <h1 className="text-3xl font-semibold text-black mx-auto">{title}</h1>

        {/* Logout Button */}
        <Button className="text-xl" variant="ghost">
          Logout
        </Button>
      </div>
    </div>
  );
}
