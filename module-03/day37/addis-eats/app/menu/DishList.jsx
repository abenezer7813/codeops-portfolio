"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";
// import { useCartStore } from "../../store/cartStore";

function DishList({ dishes }) {
  // const addItem = useCartStore((s) => s.addItem);

  return dishes.map((data) => (
    <div
      key={data.id}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-md)] bg-[var(--white)] transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(122,31,31,0.12)]"
    >
      <div>
        <img
          src={data.image || "/doro.png"}
          alt={data.nameEn}
          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="p-2.5">
        <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-black">
          {data.nameEn}
        </div>
        <div>{data.description}</div>
      </div>

      <div className="flex justify-between bg-[var(--background-warm)] px-2.5 py-[5px]">
        <span className="text-[larger] font-bold text-[color:var(--primary-dark)]">
          {data.priceETB} ETB
        </span>

        <button
          onClick={() => {
            // addItem(data, 1);
          }}
          className="cursor-pointer rounded-[var(--radius-md)] border-0 bg-[var(--brown)] px-[15px] py-0 text-[color:var(--white)] transition-[transform,background-color] duration-200 hover:bg-[var(--primary-dark)] active:translate-y-0.5"
        >
          <FiPlus /> Add
        </button>
      </div>
    </div>
  ));
}

export default DishList;