"use client";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { useCartStore } from "../../../store/cartStore"

function MenuCard({ data }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-md)] bg-[var(--white)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(122,31,31,0.12)]">
      <div className="overflow-hidden">
        <img
          src="/doro.png"
          alt={data.nameEn}
          className="w-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-[10px]">
        <Link
          href={`/menu/${data.id}`}
          className="block text-2xl font-bold text-black font-[family-name:var(--font-heading)] after:absolute after:inset-0 after:content-['']"
        >
          {data.nameEn}
        </Link>
        <p>{data.description}</p>
      </div>

      <div className="flex justify-between bg-[var(--background-warm)] px-[10px] py-[5px]">
        <span className="text-lg font-bold text-[color:var(--primary-dark)]">
          {data.priceETB} ETB
        </span>
        <button
          onClick={() => addItem(data, 1)}
          className="relative z-10 inline-flex cursor-pointer items-center gap-1 rounded-[var(--radius-md)] bg-[var(--brown)] px-[15px] text-[color:var(--white)] transition duration-100 hover:bg-[var(--primary-dark)] active:translate-y-[2px]"
        >
          <FiPlus /> Add
        </button>
      </div>
    </div>
  );
}

export default MenuCard;