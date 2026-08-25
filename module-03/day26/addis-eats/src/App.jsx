import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dish from './Dish'
function Header() {
return <h1>Addis Eats</h1>;
}
function App() {
  const menu=[{ "id": 1, "name": "Doro Wat", "category": "Main", "price": 240, "spicy": true, "description": "A rich and spicy Ethiopian chicken stew made with berbere, onions, garlic, and traditional spices." },
  { "id": 2, "name": "Shiro", "category": "Vegetarian", "price": 120, "spicy": false, "description": "A smooth chickpea flour stew cooked with onions, garlic, and mild Ethiopian spices." },
  { "id": 3, "name": "Kitfo", "category": "Main", "price": 320, "spicy": true, "description": "Minced beef seasoned with mitmita and spiced butter, traditionally served with ayibe and greens." },
  { "id": 4, "name": "Tibs", "category": "Main", "price": 280, "spicy": true, "description": "Tender pieces of sautéed meat cooked with onions, peppers, tomatoes, and Ethiopian spices." },
  { "id": 5, "name": "Injera Firfir", "category": "Breakfast", "price": 100, "spicy": true, "description": "Shredded injera mixed with berbere, spiced butter, and a flavorful Ethiopian sauce." },
  { "id": 6, "name": "Beyaynetu", "category": "Vegetarian", "price": 150, "spicy": false, "description": "A colorful combination of different Ethiopian vegetarian dishes served together on injera." },]

  return (
    <div >
      <Header/>
     <div className='menu-card'>
       {menu.map((item)=>{
      return <Dish key={item.id} name={item.name} price={item.price}/>
    })}

     </div>
    </div>
  )
}

export default App
