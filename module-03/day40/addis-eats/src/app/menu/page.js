import React, { Suspense } from 'react'
import DishList from './DishList';
import DishSkeleton from './DishSkeleton';
import { getDishes } from './dishes';
import FilterShell from './FilterShell';

export const revalidate = 3600;

export default async function MenuPage() {

  const dishes = await getDishes()
  console.log(dishes);


  return (
    <div className='grid grid-cols-[1fr-3fr]'>
      <div>
        <Suspense fallback={<DishSkeleton />}>
          <FilterShell >
            <DishList  dishes={dishes} />
          </FilterShell>
        </Suspense>
      </div>

    </div>
  )
}
