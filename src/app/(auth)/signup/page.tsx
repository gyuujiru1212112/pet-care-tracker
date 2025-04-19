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
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/lib/auth-actions";
import { toast } from "sonner";
import { useTransition } from "react";

export default function Register() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignUp = async (formData: FormData) => {
    startTransition(async () => {
      const result = await signUpWithEmail(formData);

      if (result.success) {
        setTimeout(() => {
          toast.message(`Signup successful!`);
          router.push("/login");
        }, 1000);
      } else {
        toast.error(`${result.message} Please try again.`);
      }
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cover bg-center bg-accent">
      <Card className="w-[400px] h-[400px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSignUp}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" placeholder="Email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <Button
              disabled={isPending}
              className="w-full place-items-center mt-6 hover:bg-gray-300 hover:text-gray-900 transition-all duration-300 ease-in-out"
              type="submit"
            >
              {isPending ? "Loading..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full justify-between items-center">
            <Label>Already have an account?</Label>
            <Link href="/login">
              <Button
                variant="secondary"
                disabled={isPending}
                className="hover:bg-gray-300 transition-all duration-300"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
