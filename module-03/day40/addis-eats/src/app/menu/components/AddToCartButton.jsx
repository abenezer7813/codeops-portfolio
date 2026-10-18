"use client"
import { useCartStore } from '@/store/cartStore'
import React from 'react'
import { FiPlus } from 'react-icons/fi'


function AddToCartButton({data}) {
     const addItem=useCartStore((s)=>s.addItem)
  return (
     <button
          onClick={() => {
             addItem(data, 1);
          }}
          className="cursor-pointer rounded-[var(--radius-md)] border-0 bg-[var(--bron)] px-[15px] py-0 text-[color:var(--white)] transition-[transform,background-color] duration-200 hover:bg-[var(--primary-dark)] active:translate-y-0.5"
        >
          <FiPlus /> Add
        </button>
  )
}

export default AddToCartButton