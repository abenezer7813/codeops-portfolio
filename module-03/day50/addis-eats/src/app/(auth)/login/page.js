import { Suspense } from "react";
import LoginForm from "./LoginForm";
export const metadata = {
  title: "Sign In",
  description:
    "Sign in to your Addis Eats account to manage your food orders.",
};
export default function LoginPage() {
  return (
    <Suspense  fallback={<div>Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}