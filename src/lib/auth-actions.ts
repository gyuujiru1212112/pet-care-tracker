"use server";
import { createUser, getUserFromDb } from "@/utils/db";
import { signIn, signOut } from "@/lib/auth";

export async function signUpWithEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    if (!email) throw new Error("Email is required.");

    const password = formData.get("password") as string;
    if (!password) throw new Error("Password is required.");

    const user = await getUserFromDb(email);

    if (user) {
      throw new Error("User already exists.");
    }

    await createUser(email, password);

    return {
      success: true,
      message: "Sign-up successful!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: `${error.message || "Sign-up failed."}`,
      };
    }

    return {
      success: false,
      message: `"Sign-up failed."}`,
    };
  }
}

export async function serverSignOut() {
  await signOut();
}

export async function signInWithEmailPassword(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) throw new Error("Email is required.");

  const user = await getUserFromDb(email);

  if (!user) {
    throw new Error("User does not exist.");
  }

  const password = formData.get("password") as string;
  if (!password) throw new Error("Password is required.");

  /* Workaround for next-auth not callback */
  const res = await signIn("credentials", {
    redirectTo: "/dashboard",
    email: email,
    password: password,
  });

  if (res) {
    console.log("ok?");
    // signIn("credentials", {
    //   email: email,
    //   password: password,
    // });
    // console.log("redirect?");
    // redirect("/dashboard");
  } else {
    throw new Error("Invalid password.");
  }
}
