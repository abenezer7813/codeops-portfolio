"use client";

function Categories({ categories, current, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-[10px] md:flex md:justify-center">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`cursor-pointer rounded-[var(--radius-lg)] border-none px-[5px] py-[5px] my-[5px] md:px-5 md:py-[10px] md:my-[10px] ${
            c === current
              ? "bg-[var(--primary-dark)] text-[color:var(--surface)]"
              : "bg-[var(--background-warm)] text-[color:var(--text)] hover:bg-[antiquewhite]"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default Categories;