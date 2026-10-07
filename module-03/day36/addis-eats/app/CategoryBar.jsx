import React from "react";

function CategoryBar({ categories, current, onSelect }) {
  return (
    <div className="flex justify-center gap-2.5 max-[768px]:grid max-[768px]:grid-cols-3">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`
            cursor-pointer border-0 rounded-[var(--radius-lg)]
            px-5 py-2.5 my-2.5
            max-[768px]:px-[5px] max-[768px]:py-[5px] max-[768px]:my-[5px]
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
  );
}

export default CategoryBar;