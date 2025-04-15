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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail } from "@/lib/auth-actions";

export default function Register() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSignUp(formData: FormData) {
    const result = await signUpWithEmail(formData);
    setMessage(result.message);

    if (result.success) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cover bg-center bg-accent">
      {/* { todo adjust later } */}
      <Card className="w-[380px]">
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
            <Button className="w-full place-items-center mt-6" type="submit">
              Sign up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full justify-between items-center">
            <Label>Already have an account?</Label>
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          </div>
          {message && <p className="text-sm text-destructive">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
