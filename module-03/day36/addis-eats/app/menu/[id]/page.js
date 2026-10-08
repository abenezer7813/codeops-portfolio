import React from 'react'
import NotFound from '../not-found'

export default async function DishPage({params}) {
  const {id}=await params
 
if(await id!=='1') return <NotFound/>
  return (
    <div>dish ID {id}</div>
  )
}
