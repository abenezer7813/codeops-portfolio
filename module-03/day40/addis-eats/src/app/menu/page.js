import React, { Suspense } from 'react'

import DishSkeleton from './components/DishSkeleton';
import { getDishes } from './dishes';
import FilterShell from './FilterShell';
import DishList from './DishList';

export const revalidate = 3600;

export default async function MenuPage() {

  const dishes = await getDishes()




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
