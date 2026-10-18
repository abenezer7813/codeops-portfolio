"use server";

import { z } from "zod";
import { findUserByEmail } from "@/db";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
const loginSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginAction(prevState, formData) {
    const cookieStore = await cookies();
    const session = {
        userId: user.id,
    };


    const result = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!result.success) {
        const errors = {};

        result.error.issues.forEach((issue) => {
            errors[issue.path[0]] = issue.message;
        });

        return { errors };
    }

    const user = await findUserByEmail(result.data.email);

    if (!user || user.password !== result.data.password) {
        return {
            errors: {
                login: "Invalid email or password",
            },
        };
    }



    cookieStore.set("session", JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return {
        errors: {},
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
}