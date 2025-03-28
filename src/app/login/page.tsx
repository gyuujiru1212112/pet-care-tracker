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

export default function Login() {
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
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" />
              </div>
            </div>
            <Button className="w-full place-items-center mt-6" type="submit">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Label>Don't have an account?</Label>

          <Link href="/register">
            <Button>Sign up</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
