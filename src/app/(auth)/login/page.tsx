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
import { signIn } from "@/lib/auth";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-accent">
      {/* { todo adjust later, login credential error handling } */}
      <Card className="w-[400px] h-[400px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";
              await signIn("credentials", {
                redirectTo: "/dashboard",
                email: formData.get("email") as string,
                password: formData.get("password") as string,
              });
            }}
          >
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
            <Button className="w-full place-items-center mt-6" type="submit">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex w-full justify-between items-center">
            <Label>Don't have an account?</Label>
            <Link href="/signup">
              <Button variant="secondary">Sign up</Button>
            </Link>
          </div>
          {/*todo {message && <p className="text-sm text-destructive">{message}</p>} */}
        </CardFooter>
      </Card>
    </div>
  );
}
