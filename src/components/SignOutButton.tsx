"use client";

import { serverSignOut } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <form action={serverSignOut}>
      <Button
        type="submit"
        className="text-sm sm:text-base px-2 sm:px-4"
        variant="ghost"
      >
        Sign Out
      </Button>
    </form>
  );
}
