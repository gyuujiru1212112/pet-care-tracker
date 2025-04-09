"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { createUser, getUserFromDb } from "@/utils/db";

export async function signUpWithEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let user = await getUserFromDb(email);

    if (user) {
      return {
        success: false,
        message: `Error: "User already exists"}`,
      };
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
        message: `Error: ${error.message || "Sign-up failed"}`,
      };
    }

    return {
      success: false,
      message: `Error: "Sign-up failed"}`,
    };
  }
}

export async function signInWithEmail(formData: FormData) {
  try {
    await signIn("credentials", formData);
    return {
      success: true,
      message: "Sign-in successful!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: `Error: ${error.message || "An unexpected error occurred"}`,
      };
    }
  }
}
