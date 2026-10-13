"use client"
import React, { useState } from 'react'
import CategoryBar from '../CategoryBar'

export default function MenuLayout({children}) {
    
const categories = [
        "All",
        "Traditional Stews & Wat",
        "Tibs & Grills",
        "Raw & Cured Delicacies / Kitfo",
        "Fasting & Vegan / Tsom",
        "Beverages & Tej"
    ]
  return (
<div className='flex h-100%'>
   
    <CategoryBar categories={categories}/>

    {children}</div>
  )
}
