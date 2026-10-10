import Link from 'next/link'
import React, { Suspense } from 'react'
import DishList from './DishList';
import DishSkeleton from './DishSkeleton';
import { getDishes } from './dishes';
export const revalidate = 3600;

export default async function MenuPage() {

const dishes=await getDishes()
console.log(dishes);


  return (
    <div className='flex justify-self-center text-5xl'>
    <Suspense fallback={<DishSkeleton/>}><DishList dishes={dishes}/></Suspense>
    <Link href="/menu/1">dish detail</Link>

   </div>
  )
}
