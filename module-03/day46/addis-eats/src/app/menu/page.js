import React, { Suspense } from 'react'
import DishList from './DishList';
import DishSkeleton from './DishSkeleton';
import { getDishes } from './dishes';
import FilterShell from './FilterShell';
import SearchBox from './components/SearchBox';

export const revalidate = 3600;
export const metadata = {
  title: "Menu",
  description:
    "Explore Ethiopian dishes, compare prices, and find your next favorite meal on the Addis Eats menu.",
};
export default async function MenuPage() {

  const dishes = await getDishes()
  console.log(dishes);


  return (
    <div >

      <div>

        <Suspense fallback={<DishSkeleton />}>
          <FilterShell >
            <DishList dishes={dishes} />
          </FilterShell>
        </Suspense>
      </div>

    </div>
  )
}
