
const state = {
    dishes: [],
    cart: [],
    search: ""
}
const menuContainer = document.querySelector('.menu-cards')
const searchIn=document.querySelector('#search')
async function loadMenu() {

    try {
        const res = await fetch('./menu.json')
        if (!res.ok) throw new Error('menu cannot load ')
        const menu = await res.json()
        state.dishes=menu
        console.log(state.dishes);
        render(state.dishes)
    } catch (error) {

        menuContainer.textContent = "Could not load the menu.";
    }
}


function render(dishes) {

   menuContainer.innerHTML= dishes.map(item=>{

    return `<div class="card" id=${item.id}>
        <img src="./assets/doro.png" alt="Doro Wat" />

        <div class="desc">
            <div class="name-price">
                <h3 class="food-name">${item.name} </h3>
               ${item.spicy? `<span id='spicy'>spicy</span>`:""}
                <p class="price">${item.price} ETB</p>
            </div>

            <p class="food-desc">
                ${item.description}
            </p>

            <button class="add-cart">Add to Cart</button>
        </div>
    </div>` }
    
   
   ).join("")
    

}

searchIn.addEventListener('input',()=>{
const value=searchIn.value
console.log(value);
const filteredDishes=state.dishes.filter(item =>
    item.name.toLowerCase().includes(value)
)
render(filteredDishes)
})

loadMenu()