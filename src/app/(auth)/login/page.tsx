"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInWithEmailPassword } from "@/lib/auth-actions";
import { toast } from "sonner";
import { useTransition } from "react";

export default function Login() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await signInWithEmailPassword(formData);
      } catch (error) {
        if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
          if (error.message === "User does not exist.") {
            toast.error(`${error.message} Please try again.`);
          } else {
            toast.error(`Invalid password. Please try again.`);
          }
        }
      }
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-accent">
      <Card className="w-[400px] h-[400px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSignIn}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="Email" type="email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
              </div>
            </div>
            <Button
              disabled={isPending}
              className="w-full place-items-center mt-6 hover:bg-gray-300 hover:text-gray-900 transition-all duration-300 ease-in-out"
              type="submit"
            >
              {isPending ? "Loading..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full justify-between items-center">
            <Label>Don&apos;t have an account?</Label>
            <Link href="/signup">
              <Button
                disabled={isPending}
                variant="secondary"
                className="hover:bg-gray-300 transition-all duration-300"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
