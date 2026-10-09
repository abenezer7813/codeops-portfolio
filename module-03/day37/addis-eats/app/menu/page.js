import Link from 'next/link'
import React from 'react'
export const revalidate = 3600;
export default function MenuPage() {

  return (
    <div className='flex justify-self-center text-5xl'>MenuPage 
    <Link href="/menu/1">dish detail</Link>

   </div>
  )
}
