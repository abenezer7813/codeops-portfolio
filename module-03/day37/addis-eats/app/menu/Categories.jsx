// app/menu/Categories.jsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Categories({ categories }) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "All";

  return (
    <nav>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((c) => (
          <li key={c}>
            <Link
              href={c === "All" ? "/menu" : `/menu?category=${encodeURIComponent(c)}`}
              style={{ fontWeight: c === active ? "bold" : "normal" }}
            >
              {c}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}