"use client";
import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowRight, FiEye, FiLock, FiMail, FiSmartphone } from "react-icons/fi";
import { useAuthStore } from "@/store/authStore";
import { loginAction } from "./action";

function Login() {

    const [state, formAction, pending] = useActionState(
        loginAction,
        { errors: {} }
    );

    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (state.user) {
            setUser(state.user);

            const redirectTo = searchParams.get("from") || "/menu";

            router.replace(redirectTo);
        }

    }, [state.user, setUser, router, searchParams]);


    return (
        <div className="mx-auto my-[10px] flex w-1/2 flex-col gap-[10px] rounded-[var(--radius-md)] bg-[var(--surface)] p-10">
            <h1>Welcome TO Mesob Table</h1>

            <p>
                Sign in to manage your feast, Telebirr rewards, and reserved
                dining mesobs
            </p>

            <form action={formAction}>
                <div className="inline-flex flex-row gap-5 rounded-[var(--radius-md)] bg-[var(--background-warm)] p-[5px]">
                    <div className="rounded-[var(--radius-md)] bg-[var(--surface)] p-[10px] font-bold text-[var(--primary-dark)]">
                        <FiMail className="inline" /> Email Address
                    </div>

                    <div className="cursor-pointer p-[10px]">
                        <FiSmartphone className="inline" /> Ethiopian Mobile
                        (+251)
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="text-black">
                        Email
                    </label>

                    <div className="rounded-[var(--radius-md)] bg-[var(--background-warm)] p-[10px]">
                        <FiMail size={20} className="inline" />

                        <input
                            type="email"
                            id="email"
                            name="email"
                            
                            placeholder="example@gmail.com"
                            className="ml-5 w-[90%] border-0 bg-transparent outline-none"
                            
                        />
                    </div>

                    <p className="text-red-600">{state.errors.email}</p>

                    <label htmlFor="pass" className="text-black">
                        Password
                    </label>

                    <div className="rounded-[var(--radius-md)] bg-[var(--background-warm)] p-[10px]">
                        <FiLock size={20} color="black" className="inline" />

                        <input
                            type="password"
                            id="pass"
                            name="password"
    
                            placeholder="*******"
                            className="ml-5 w-[90%] border-0 bg-transparent outline-none"
                            
                        />

                        <FiEye size={20} className="inline" />
                    </div>

                    <p className="text-red-600">{state.errors.password}</p>
                    <p className="text-red-600">{state.errors.login}</p>

                    <div className="flex justify-between">
                        <span>
                            <input
                                className="h-[18px] w-[18px] cursor-pointer accent-[var(--primary-dark)]"
                                type="checkbox"
                            />{" "}
                            Remember me on this phone
                        </span>

                        <span className="cursor-pointer font-bold hover:text-[var(--primary-dark)]">
                            Forgot PIN ?
                        </span>
                    </div>

                    <div className="my-5 flex w-[90%] justify-center rounded-[var(--radius-md)] bg-[var(--brown)] px-[30px] py-[10px] shadow-[var(--shadow-md)] hover:bg-[var(--primary-dark)]">
                        <button
                            type="submit"
                            className="cursor-pointer border-0 bg-transparent text-[var(--surface)]"
                        >
                            Sign In to Mesob House <FiArrowRight />
                        </button>
                    </div>
                </div>
            </form>

            <div className="my-[10px] border-2 border-[var(--background-warm)]" />

            <div className="flex flex-col">
                <p>New to our dining family?</p>

                <p
                    className="cursor-pointer font-bold text-[var(--brown)] hover:text-[var(--primary-dark)]"
                    onClick={() => router.push("/register")}
                >
                    Join the Mesob Table & Register
                </p>
            </div>
        </div>
    );
}

export default Login;