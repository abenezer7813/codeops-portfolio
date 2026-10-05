import { Suspense } from "react";
import FilterShell from "./FilterShell";
import DishList from "./DishList";
import DishSkeleton from "./DishSkeleton";

export const revalidate = 3600;

export default function MenuPage() {
  return (
    <FilterShell>
      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </FilterShell>
  );
}