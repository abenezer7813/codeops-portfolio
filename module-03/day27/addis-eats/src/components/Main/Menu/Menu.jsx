
import { useState } from 'react'
import './Menu.css'
import Dish from './Dish/Dish'

function Menu() {

  const [category, setCategory] = useState('All')

  const menu = [
    { "id": 1, "name": "Doro Wat", "category": "Main", "price": 240, "spicy": true, "description": "A rich and spicy Ethiopian chicken stew made with berbere, onions, garlic, and traditional spices." },
    { "id": 2, "name": "Shiro", "category": "Vegetarian", "price": 120, "spicy": false, "description": "A smooth chickpea flour stew cooked with onions, garlic, and mild Ethiopian spices." },
    { "id": 3, "name": "Kitfo", "category": "Main", "price": 320, "spicy": true, "description": "Minced beef seasoned with mitmita and spiced butter, traditionally served with ayibe and greens." },
    { "id": 4, "name": "Tibs", "category": "Main", "price": 280, "spicy": true, "description": "Tender pieces of sautéed meat cooked with onions, peppers, tomatoes, and Ethiopian spices." },
    { "id": 5, "name": "Injera Firfir", "category": "Breakfast", "price": 100, "spicy": true, "description": "Shredded injera mixed with berbere, spiced butter, and a flavorful Ethiopian sauce." },
    { "id": 6, "name": "Beyaynetu", "category": "Vegetarian", "price": 150, "spicy": false, "description": "A colorful combination of different Ethiopian vegetarian dishes served together on injera." },
    { "id": 7, "name": "Misir Wat", "category": "Vegetarian", "price": 110, "spicy": true, "description": "Spicy red lentil stew simmered with berbere, onions, garlic, and aromatic spices." },
    { "id": 8, "name": "Gomen", "category": "Vegetarian", "price": 90, "spicy": false, "description": "Tender collard greens cooked with garlic, onions, and mild Ethiopian spices." },
    { "id": 9, "name": "Atkilt Wot", "category": "Vegetarian", "price": 100, "spicy": false, "description": "A mild vegetable stew made with cabbage, potatoes, carrots, onions, and turmeric." },
    { "id": 10, "name": "Derek Tibs", "category": "Main", "price": 310, "spicy": true, "description": "Well-seasoned pieces of grilled or fried meat prepared with spicy Ethiopian spices and peppers." },
    { "id": 11, "name": "Key Wat", "category": "Main", "price": 220, "spicy": true, "description": "A spicy Ethiopian beef stew slowly cooked with berbere, onions, garlic, and butter." },
    { "id": 12, "name": "Alicha Wat", "category": "Main", "price": 210, "spicy": false, "description": "A mild meat stew prepared with turmeric, onions, garlic, and gentle Ethiopian spices." },
    { "id": 13, "name": "Bozena Shiro", "category": "Main", "price": 180, "spicy": true, "description": "A flavorful chickpea flour stew combined with tender pieces of meat and Ethiopian spices." },
    { "id": 14, "name": "Ayibe", "category": "Side", "price": 70, "spicy": false, "description": "A mild and fresh Ethiopian cottage cheese commonly served alongside spicy dishes." },
    { "id": 15, "name": "Kocho", "category": "Side", "price": 60, "spicy": false, "description": "A traditional Ethiopian fermented bread made from enset, with a soft and slightly tangy flavor." },
    { "id": 16, "name": "Enkulal Firfir", "category": "Breakfast", "price": 110, "spicy": true, "description": "Scrambled eggs mixed with shredded injera, berbere, onions, and flavorful Ethiopian spices." },
    { "id": 17, "name": "Fuul", "category": "Breakfast", "price": 90, "spicy": true, "description": "Cooked fava beans seasoned with onions, peppers, spices, and optional toppings for a hearty breakfast." },
    { "id": 18, "name": "Genfo", "category": "Breakfast", "price": 130, "spicy": true, "description": "A thick Ethiopian porridge traditionally served with a spicy butter and berbere sauce in the center." },
    { "id": 19, "name": "Chechebsa", "category": "Breakfast", "price": 120, "spicy": true, "description": "Torn pieces of flatbread cooked with spiced butter and berbere, creating a rich and flavorful breakfast." },
    { "id": 20, "name": "Kik Alicha", "category": "Vegetarian", "price": 100, "spicy": false, "description": "A mild yellow split-pea stew cooked with turmeric, onions, garlic, and traditional Ethiopian spices." }
  ]

  const filteredMenu =
    category === 'All'
      ? menu
      : menu.filter((dish) => dish.category === category)
      const [ clicked,setClicked]=useState(false)

  return (
    <>
      

      <div >
        <div className="categories">
        <button   className={category === 'All' ? 'active' : ''} onClick={() => setCategory('All')}>
          All
        </button>

        <button   className={category === 'Main' ? 'active' : ''} onClick={() => setCategory('Main')}>
          Main
        </button>

        <button   className={category === 'Vegetarian' ? 'active' : ''} onClick={() => setCategory('Vegetarian')}>
          Vegetarian
        </button>

        <button   className={category === 'Breakfast' ? 'active' : ''} onClick={() => setCategory('Breakfast')}>
          Breakfast
        </button>

        <button   className={category === 'Side' ? 'active' : ''} onClick={() => setCategory('Side')}>
          Side
        </button>
      </div>
      <div className="menu">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
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
