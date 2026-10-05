"use client";
import { useCart } from "@/context/CartContext"; // your Day 31 hook

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();
  return <button onClick={() => addItem(dish)}>Add to cart</button>;
}