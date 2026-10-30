
"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/app/(auth)/login/action";

function Header() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const cartCount = useCartStore((s) =>
    s.items.reduce((count, item) => count + item.quantity, 0)
  );

  const cartTotal = useCartStore((s) =>
    s.items.reduce(
      (total, item) => total + item.priceETB * item.quantity,
      0
    )
  );

  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    logoutAction();
    logout();
    router.push("/login");
  }

  const navLinkClass = (href) =>
    `rounded-md px-3 py-2 no-underline transition-colors ${
      pathname === href
        ? "bg-(--primary-dark) text-(--white) font-semibold"
        : "text-(--text) hover:bg-(--background) hover:text-(--primary-dark)"
    }`;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-evenly border-b border-(--border) bg-(--white) px-6 py-5 shadow-(--shadow-md) max-md:flex-wrap max-md:gap-4">
      <Link
        href="/menu"
        className="text-xl font-bold no-underline text-(--primary-dark)"
      >
        Mesob Habesha House
      </Link>

      <div className="flex items-center gap-3">
        {user && (
          <nav className="flex items-center gap-2 max-md:flex-wrap">
            <Link href="/menu" className={navLinkClass("/menu")}>
              Menu
            </Link>

            <Link href="/cart" className={navLinkClass("/cart")}>
              Order & Cart
            </Link>

            <Link href="/checkout" className={navLinkClass("/checkout")}>
              Delivery & Checkout
            </Link>

            <div className="flex flex-col rounded-md bg-(--background) px-6 py-2">
              <span>{cartCount} Items</span>
              <span className="font-bold text-(--gold)">
                {cartTotal} ETB
              </span>
            </div>

            <span>Hi, {user.name}</span>

            <button
              className="cursor-pointer border-0 bg-transparent px-3 py-2 text-(--primary-dark)"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        )}

        {!user && (
          <nav className="flex items-center gap-2">
            <Link href="/login" className={navLinkClass("/login")}>
              Sign In
            </Link>

            <Link href="/signup" className={navLinkClass("/signup")}>
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
