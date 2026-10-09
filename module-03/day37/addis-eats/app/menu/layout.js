"use client"
import React, { useState } from 'react'
import CategoryBar from '../CategoryBar'

export default function MenuLayout({children}) {
    const [count,setCount]=useState(0)
const categories = [
        "All",
        "Traditional Stews & Wat",
        "Tibs & Grills",
        "Raw & Cured Delicacies / Kitfo",
        "Fasting & Vegan / Tsom",
        "Beverages & Tej"
    ]
  return (
<div>
    <button onClick={()=>setCount(count+1)}> click me {count}</button>
    <CategoryBar categories={categories}/>

    {children}</div>
  )
}
