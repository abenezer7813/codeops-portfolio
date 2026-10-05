import Link from "next/link";

const categories = [
  { label: "All dishes", href: "/menu" },
  { label: "Main dishes", href: "/menu#main" },
  { label: "Fasting food", href: "/menu#fasting" },
  { label: "Drinks", href: "/menu#drinks" },
];

export default function MenuLayout({ children }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
      <aside className="w-56 shrink-0">
        <h2 className="mb-4 text-lg font-semibold">Categories</h2>
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.label}>
              <Link
                href={c.href}
                className="block rounded-md px-3 py-2 hover:bg-gray-100"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}