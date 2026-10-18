"use server";

import { z } from "zod";
import { createUser } from "@/db";
import { redirect } from "next/navigation";

const registerSchema = z
    .object({
        name: z.string().min(1, "Name cannot be empty").min(2, "Name too short"),
        email: z.email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export async function registerAction(prevState, formData) {
    console.log(formData);
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };
    console.log(data);

    const result = registerSchema.safeParse(data);

    if (!result.success) {
        const errors = {};

        result.error.issues.forEach((issue) => {
            errors[issue.path[0]] = issue.message;
        });

        return { errors };
    }

    try {
        await createUser({
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        });
    } catch (error) {
        return {
            errors: {
                email: error.message,
            },
        };
    }

    redirect("/login");
}