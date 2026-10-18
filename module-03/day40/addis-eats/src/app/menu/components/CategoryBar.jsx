"use client";

import React from "react";

function CategoryBar({ categories, current, onSelect }) {
  return (
    <aside className="w-56 shrink-0">
      <div className="flex flex-col gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`
              w-full cursor-pointer border-0 rounded-[var(--radius-lg)]
              px-5 py-3 text-left
              ${
                c === current
                  ? "bg-[var(--primary-dark)] text-[color:var(--surface)]"
                  : "bg-[var(--background-warm)] text-[color:var(--text)] hover:bg-[#faebd7]"
              }
            `}
          >
            {c}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default CategoryBar;