
import { use, useEffect, useState } from 'react'
import './Menu.css'
import Dish from './Dish/Dish'
import CategoryBar from './CategoryBar/CategoryBar'
import Search from './Search/Search'

function Menu() {

  const [category, setCategory] = useState('All')
  const [dishes, setDishes] = useState([])


  const filteredMenu =
    category === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === category)

  const [total, setTotal] = useState(0)
  function calTotal(price) {
    setTotal(total + price)
  }

  useEffect(() => {
    try {
        const ctrl=new AbortController()
      fetch('/dishes.json').then(res => res.json()).then(setDishes)
      console.log(dishes);

    } catch (error) {

    }
  }, [category])

  

  return (
    <>


      <div >
        <div className='total'>Total Price <strong>{total} ETB</strong>
        </div>
        <div><Search/></div>
        <div className='categories'>
          <CategoryBar selected={category} onSelect={setCategory} />
        </div>
        <div className="menu">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((dish) => (
              <Dish
                key={dish.id}
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
                calcTotal={calTotal}
              />
            ))
          ) : (
            <p>No dishes found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Menu
