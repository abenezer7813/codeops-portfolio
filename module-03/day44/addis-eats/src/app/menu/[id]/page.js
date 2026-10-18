import React from 'react'
import NotFound from '../not-found'
import { getDishes } from '../dishes';
export async function generateStaticParams() {
  const dishes =getDishes()
  return [
    { id: "doro-wat" },
    { id: "tibs" },
    { id: "shiro" },
    { id: "kitfo" },
  ];
}

export default async function DishPage({params}) {
  const {id}=await params
 
if(await id!=='1') return <NotFound/>
  return (
    <div>dish ID {id}</div>
  )
}
