import React from 'react'

function DishSkeleton() {
  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-md)] bg-[var(--white)] transition-[transform,box-shadow] duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(122,31,31,0.12)]">DishSkeleton</div>
  )
}

export default DishSkeleton