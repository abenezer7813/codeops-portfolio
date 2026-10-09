import Link from 'next/link'
import React, { Suspense } from 'react'
import DishList from './DishList';
import DishSkeleton from './DishSkeleton';
export const revalidate = 3600;
export default function MenuPage() {
const dishes = [
  {
    id: 1,
    nameEn: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and a boiled egg.",
    priceETB: 650,
  },
  {
    id: 2,
    nameEn: "Tibs",
    description: "Tender beef sautéed with onions, tomatoes, rosemary, and green peppers.",
    priceETB: 580,
  },
  {
    id: 3,
    nameEn: "Shiro Wat",
    description: "Smooth and flavorful chickpea stew seasoned with Ethiopian spices.",
    priceETB: 250,
  },
  {
    id: 4,
    nameEn: "Kitfo",
    description: "Traditional Ethiopian minced beef seasoned with mitmita and spiced butter.",
    priceETB: 700,
  },
];


  return (
    <div className='flex justify-self-center text-5xl'>
    <Suspense fallback={<DishSkeleton/>}><DishList dishes={dishes}/></Suspense>
    <Link href="/menu/1">dish detail</Link>

   </div>
  )
}
