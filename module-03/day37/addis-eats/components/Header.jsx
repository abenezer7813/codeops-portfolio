"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const user = null;
  const cartCount = 0;
  const cartTotal = 0;

  const navClass = (path) =>
    `px-2.5 py-2.5 rounded-md no-underline ${
      pathname === path
        ? "bg-[var(--primary-dark)] text-white"
        : "text-inherit"
    }`;

  return (
    <header className="sticky top-0 z-[1000] flex justify-evenly border-b border-[var(--border)] bg-[var(--white)] px-[50px] py-5 shadow-[var(--shadow-md)]">
      <Link
        href="/menu"
        className="text-inherit no-underline"
      >
        Mesob Habesha House
      </Link>

      <nav className="flex gap-2.5">
        <Link
          href="/menu"
          className={navClass("/menu")}
        >
          Menu
        </Link>

        <Link
          href="/cart"
          className={navClass("/cart")}
        >
          Order & Cart
        </Link>

        <Link
          href="/checkout"
          className={navClass("/checkout")}
        >
          Delivery & Checkout
        </Link>

        <div className="flex flex-col rounded-md bg-[var(--background)] px-[25px]">
          <div>{cartCount} Items</div>

          <div className="font-bold text-[var(--gold)]">
            {cartTotal} ETB
          </div>
        </div>

        <span className="px-2.5 py-2.5">
          Hi, Guest
        </span>

        <button className="cursor-pointer border-none bg-transparent text-[var(--primary-dark)]">
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;

