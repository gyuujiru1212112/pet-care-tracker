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
import { useState } from "react";
import { signInWithEmail } from "@/lib/auth-actions";

export default function Login() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(formData: FormData) {
    const result = await signInWithEmail(formData);
    if (result?.success) {
      console.log("login succeed");
      setMessage(result.message);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {/* { todo adjust later } */}
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="Email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input name="password" placeholder="Password" type="password" />
              </div>
            </div>
            <Button className="w-full place-items-center mt-6" type="submit">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full justify-between items-center">
            <Label>Don't have an account?</Label>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
          {message && <p className="text-sm text-destructive">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
