"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiEye, FiLock, FiMail } from "react-icons/fi";
import { BsFilePerson } from "react-icons/bs";
import { z } from "zod";
import { registerUser } from "../../../services/authService";
import { registerAction } from "./action";


function SigninPage() {
    const [state, formAction, pending] = useActionState(
    registerAction,
    { errors: {} }
);
    const registerSchema = z
        .object({
            name: z
                .string()
                .min(1, "Name can not be empty")
                .min(2, "Name too short"),
            email: z.email("Invalid email"),
            password: z
                .string("password cannot be empty")
                .min(6, "Password must be at least 6 characters"),
            confirmPassword: z
                .string()
                .min(1, "Please confirm your password"),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });

    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        const result = registerSchema.safeParse(form);
        const validationErrors = {};

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                validationErrors[issue.path[0]] = issue.message;
            });
        }

        if (Object.keys(validationErrors).length === 0) {
            try {
                registerUser({
                    name: result.data.name,
                    email: result.data.email,
                    password: result.data.password,
                });

                setErrors({});
                router.push("/login");
            } catch (err) {
                setErrors({ email: err.message });
            }
        } else {
            setErrors(validationErrors);
        }
    }

    return (
        <div className="mx-auto my-[10px] flex w-1/2 flex-col gap-[10px] rounded-[var(--radius-md)] bg-[var(--surface)] p-10 shadow-[0_18px_45px_rgba(80,40,30,0.20)]">
            <div>
                <h1>Create Your Mesob House Account</h1>
                <p>Join our culinary circle in less than a minute</p>
            </div>

            <form action={formAction} className="flex flex-col">
                <div>
                    <label htmlFor="name" className="text-black">
                        Full Name
                    </label>

                    <div className="rounded-[var(--radius-md)] bg-[var(--background-warm)] p-[10px]">
                        <BsFilePerson />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Abenezer Tariku"
                            className="ml-5 w-[90%] border-0 bg-transparent outline-none"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            value={form.name}
                        />
                    </div>
                </div>

                <p className="text-red-600">{state.errors?.name}</p>

                <div>
                    <label htmlFor="email" className="text-black">
                        Email Address
                    </label>

                    <div className="rounded-[var(--radius-md)] bg-[var(--background-warm)] p-[10px]">
                        <FiMail />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@gmail.com"
                            className="ml-5 w-[90%] border-0 bg-transparent outline-none"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            value={form.email}
                        />
                    </div>
                </div>

                <p className="text-red-600">{state.errors?.email}</p>

                <div className="flex justify-between gap-5">
                    <div className="w-full">
                        <label htmlFor="pass" className="text-black">
                            Password
                        </label>

                        <div className="rounded-[var(--radius-md)] bg-[var(--background-warm)] p-[10px]">
                            <FiLock />
                            <input
                                type="password"
                                id="pass"
                                name="password"
                                className="ml-5 w-[70%] border-0 bg-transparent outline-none"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                value={form.password}
                            />
                            <FiEye />
                        </div>

                        <p className="text-red-600">{state.errors?.password}</p>
                    </div>

                    <div className="w-full">
                        <label htmlFor="confirm" className="text-black">
                            Confirm Password
                        </label>

                        <div className="rounded-[var(--radius-md)] bg-[var(--background-warm)] p-[10px]">
                            <FiLock />
                            <input
                                type="password"
                                id="confirm"
                                name="confirmPassword"
                                className="ml-5 w-[70%] border-0 bg-transparent outline-none"
                                value={form.confirmPassword}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                            <FiEye />
                        </div>

                        <p className="text-red-600">
                            {state.errors?.confirmPassword}
                        </p>
                    </div>
                </div>

                <div className="my-[30px] flex w-[90%] justify-center rounded-[var(--radius-md)] bg-[var(--brown)] px-[30px] py-[10px] shadow-[var(--shadow-md)] hover:bg-[var(--primary-dark)]">
                    <button
                       disabled={pending}
                        type="submit"
                        className="cursor-pointer border-0 bg-transparent text-[var(--surface)]"
                    >
                         {pending ? "Creating Account..." : "Create Account"} <FiArrowRight />
                    </button>
                </div>
            </form>

            <div className="my-[10px] border-2 border-[var(--background-warm)]" />

            <div>
                <p>Already part of our dining family?</p>

                <p
                    className="cursor-pointer font-bold text-[var(--brown)] hover:text-[var(--primary-dark)]"
                    onClick={() => router.push("/login")}
                >
                    Sign in here
                </p>
            </div>
        </div>
    );
}

export default SigninPage;