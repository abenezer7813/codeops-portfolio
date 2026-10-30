"use client";
import React, { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import { useRouter } from "next/navigation";
import SearchBox from "./components/SearchBox";
import Image from "next/image";
// import { useCartStore } from "../../store/cartStore";

function DishList({ dishes }) {
  // const addItem = useCartStore((s) => s.addItem);
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDishes = dishes.filter((dish) =>
    dish.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (<div >
    <SearchBox onSearch={setSearchTerm} />
    <div className="grid grid-cols-4">
      {filteredDishes.map((data) => (
        <div
          key={data.id}

          onClick={() => router.push(`/menu/${data.id}`)}
        >
          <div className="group flex flex-col gap-4 cursor-pointer  overflow-hidden rounded-[var(--radius-md)] bg-[var(--white)] transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(122,31,31,0.12)]">
            <Image
              src={'/doro.png'}
              alt={data.nameEn}
              width={400}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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

            <AddToCartButton data={data} />
          </div>
        </div>
      ))}
    </div>
  </div>)
}

export default DishList;