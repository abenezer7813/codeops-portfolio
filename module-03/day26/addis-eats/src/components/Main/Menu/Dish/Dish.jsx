import React from 'react'
import './Dish.css'
const image ="../../../../assets/doro.png"
function Dish(
    { dish }
) {
    const { name, price, description,spicy} = dish
    return (
        <div className='dish'>
            {/* <div className='image'><img src='./doro.png' alt={name} /></div> */}
            <div className='name'>{name}</div>
            <div className='price'>{price} ETB</div>
            {/* {spicy?<div className='spicy'>Spicy</div>:<div></div>}
            <div className='description'>{description}</div> */}
        </div>
    )
}

export default Dish