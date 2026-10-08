import React from 'react'
import CategoryBar from '../CategoryBar'

export default function layout({children}) {
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
    <CategoryBar categories={categories}/>
    {children}</div>
  )
}
