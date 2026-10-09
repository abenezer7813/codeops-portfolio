import React from 'react'
import NotFound from '../not-found'
export async function generateStaticParams() {
  return [
    { slug: "doro-wat" },
    { slug: "tibs" },
    { slug: "shiro" },
    { slug: "kitfo" },
  ];
}

export default async function DishPage({params}) {
  const {slug}=await params
 
if(await slug!=='1') return <NotFound/>
  return (
    <div>dish ID {slug}</div>
  )
}
