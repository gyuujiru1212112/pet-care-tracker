"use server";
import { createUser, getUserFromDb } from "@/utils/db";

export async function signUpWithEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    if (!email) throw new Error("Email is required");

    const password = formData.get("password") as string;
    if (!password) throw new Error("Password is required");

    let user = await getUserFromDb(email);

    if (user) {
      throw new Error("User already exists");
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
