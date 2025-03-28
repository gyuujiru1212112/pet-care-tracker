"use server"

import prisma from "./prisma"

export async function registerUser(formData: FormData) {
    if (!formData.get("email")) {
        return {error: "Email is required"}
    }

    if (!formData.get("password")) {
        return {error: "Password is required"}
    }

    const emailExists = await prisma.user.findUnique({
        where: {
            email: formData.get("email")?.toString()!
        }
    });
    if (emailExists) {
        return {error: "User already exists"}
    }

    const user = await prisma.user.create({
        data: {
            email: formData.get("email")?.toString()!,
            password: formData.get("password")?.toString()!
        }
    })
    //todo authentication
    return user
}

export async function login(formData: FormData) {
    if (!formData.get("email")) {
        return {error: "Email is required"}
    }

    if (!formData.get("password")) {
        return {error: "Password is required"}
    }

    const user = await prisma.user.findUnique({
        where: {
            email: formData.get("email")?.toString()!,
            password: formData.get("password")?.toString()!
        }
    })

    // todo authentication
    return user
}