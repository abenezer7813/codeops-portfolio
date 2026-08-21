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
const checkoutBtn = document.querySelector('#checkout-btn')
function renderCart() {
    let total = 0
    if (state.cart.length === 0) {
        console.log(state.cart.length);
        checkoutBtn.disabled = true
    } else {
        checkoutBtn.disabled = false
    }
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
const checkoutSec=document.querySelector('#checkout-sec')
cartBtn.addEventListener('click', () => {
    cart.classList.add('show')
    console.log(state.cart.length);
    
    document.body.style.overflow = "hidden";
})
checkoutBtn.addEventListener('click', (e) => {
    checkoutSec.classList.add('show')
    cart.classList.remove('show');
     document.body.style.overflow = '';
})
const cart = document.querySelector('#cart-sec')
closeBtn.addEventListener('click', () => {
    cart.classList.remove('show');
     document.body.style.overflow = '';
   
});

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
            if (item.qty === 0) {
                state.cart = state.cart.filter(i => i.id !== id)
            } (item)
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
    console.log("BEFORE PARSE:", savedCart);
    if (savedCart) {
        console.log("savedCart:", savedCart);
        console.log("state.cart:", state.cart);
        console.log("length:", state.cart.length);

        renderCart();
    }
}

async function init() {
    await loadMenu()
    load()
}

init()

const formEl = document.querySelector('#checkout-form')
const nameIn = document.querySelector('#name')
const phoneIn = document.querySelector('#phone')
const deliveryAriaIn = document.querySelector('#area')
const errorEl = document.querySelector('#form-error')

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = nameIn.value.trim()
    const phone = phoneIn.value.trim()
    const deliveryAria = deliveryAriaIn.value
    const error = validate(name, phone)

    errorEl.textContent = error
    if (error) return
    const data = { name, phone }
    palaceOrder(data)
      checkoutSec.classList.remove('show')

})

function validate(name, phone) {

    const regEx = /^(?:\+251|0)9\d{8}$/

    console.log(name);

    if (!name) return "Name field cannot be empty"


    if (name.length < 2) return "Name cannot be less than two letters"
    if (!phone) return 'Phone field cannot be empty '
    if (!regEx.test(phone)) return 'Please enter phone number in valid format'
    return ""
}

function palaceOrder(data) {
    const order = {
        ...data,
        items: state.cart,
        total: 1000,
        placedAt: new Date().toISOString()
    }
    console.log(order);
    state.cart = []
    save(); renderCart()
    showConfirmation(order)

}
const confirmSection = document.querySelector('#confirmation')
function showConfirmation(order) {
    console.log(order);
    confirmSection.innerHTML = `<div id="confirm-card">
                
                <h2>Order Placed Successfully</h2>
                 <div> 
                    <p>Name</p>
                    <p>${order.name}</p>
                </div>
                <div> 
                    <p>Phone</p>
                    <p>${order.phone}</p>
                </div>
                <div> 
                    <p>Items</p>
                    <div id="ordered-items">${order.items.map(item => `<p>${item.name}</p>`).join('')}<div/>
                </div>

                <div> 
                    <p>Total</p>
                    <p>${calcTotal(order.items)}</p>
                </div>
            </div>`
}

function calcTotal(items){
    let total=0
    items.map(item=> total +=item.price*item.qty)
    return total
}
