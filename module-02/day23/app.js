const state = { dishes: [], cart: [], search: "" }
const menuContainer = document.querySelector('.menu-cards')
const searchIn = document.querySelector('#search')
const addCartBtn = document.querySelector('.add-cart')

async function loadMenu() {
    try {
        const res = await fetch('./menu.json')
        if (!res.ok) throw new Error('menu cannot load ')
        const menu = await res.json()
        state.dishes = menu
        console.log(state.dishes);
        render(state.dishes)
    } catch (error) {
        menuContainer.textContent = "Could not load the menu.";
    }
}

function render() {
    const dishes = state.dishes.filter(menu => menu.name.toLowerCase().includes(state.search))
    menuContainer.innerHTML = dishes.map(item => {
        return `<div class="card" id=${item.id}> <img src="./assets/doro.png" alt="Doro Wat" /> <div class="desc"> <div class="name-price"> <h3 class="food-name">${item.name} </h3> ${item.spicy ? `<span id='spicy'>spicy</span>` : ""} <p class="price">${item.price} ETB</p> </div> <p class="food-desc"> ${item.description} </p> <button class="add-cart" data-id=${item.id}>Add to Cart</button> </div> </div>`
    }).join("")
}

searchIn.addEventListener('input', () => {
    const value = searchIn.value
    console.log(value);
    const searchValue = searchIn.value.toLowerCase()
    state.search = searchValue
    render()
})

menuContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-cart')) {
        const id = Number(e.target.dataset.id)
        const item = state.dishes.find(item => item.id == id)
        const exist = state.cart.find(i => i.id === id);
        if (exist) exist.qty++;
        else state.cart.push({ ...item, qty: 1 })
        console.log(state.cart);
        renderCart()
        save()
    }
});

const cartContainer = document.querySelector('#cart-items')
const subTotal = document.querySelector('#subtotal')

function renderCart() {
    let total = 0
    cartContainer.innerHTML = state.cart.map(item => {
        console.log(item.name);
        total += item.price * item.qty
        subTotal.textContent = `${total} ETB`
        if (item.qty === 0) return ""
        return `<div class="cart-item"> <p class="item-name">${item.name}</p> <div class="btn"> <button ><i data-id=${item.id} class="fa-solid fa-minus sub"></i></button> <span class="qty">${item.qty}</span> <button ><i data-id=${item.id} class="fa-solid fa-plus add"></i></button> </div> </div>`
    }).join("")
}

const closeBtn = document.querySelector('#close-btn')
const cartBtn = document.querySelector('#cart-btn')
cartBtn.addEventListener('click', () => cart.classList.add('show'))
const cart = document.querySelector('#cart-sec')
closeBtn.addEventListener('click', () => { cart.classList.remove('show'); });

const cartItem = document.querySelector('#cart-items')
cartItem.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('add')) {
        const id = Number(target.dataset.id)
        const item = state.cart.find(i => i.id === id);
        if (item) {
            item.qty++;
            renderCart()
            save()
        }
    } else if (target.classList.contains('sub')) {
        const id = Number(target.dataset.id)
        const item = state.cart.find(i => i.id === id);
        if (item) {
            item.qty--;
             if(item.qty==0) state.cart.pop(item)
            renderCart()
            save()
        }
    }
})

const key = 'cart'

function save() {
    localStorage.setItem(key, JSON.stringify(state.cart))
}

function load() {
    const savedCart = localStorage.getItem(key);
    if (savedCart) {
        state.cart = JSON.parse(savedCart);
        renderCart()
    }
}

async function init() {
 await   loadMenu()
    load()
}

init()
