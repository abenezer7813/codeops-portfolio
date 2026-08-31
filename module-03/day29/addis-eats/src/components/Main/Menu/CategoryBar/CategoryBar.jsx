import React from 'react'
import './Category.css'
function CategoryBar({ selected, onSelect }) {

    const cats = ['All', 'Main', 'Breakfast', 'Vegetarian', 'Side']
    return cats.map(cat => (
        <button key={cat} className={cat === selected ? 'active' : ''} onClick={ () => onSelect(cat)}>{cat}</button>
    )

    )
}

export default CategoryBar