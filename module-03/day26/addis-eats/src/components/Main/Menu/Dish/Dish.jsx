import React from 'react'
import './Dish.css'
function Dish(
    { dish }
) {
    const { name, price, } = dish
    return (
        <div className='dish'>
            <div>{name}</div>
            <div>{price}</div>
        </div>
    )
}

export default Dish