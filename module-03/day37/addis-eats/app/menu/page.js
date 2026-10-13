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
    <div  className='grid grid-cols-[1fr-3fr]'>
   <div className='grid grid-cols-4'> <Suspense fallback={<DishSkeleton/>}><DishList dishes={dishes}/></Suspense>
   </div>

   </div>
  )
}
