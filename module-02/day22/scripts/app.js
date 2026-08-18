const state = {
    base: "ETB",
    rates: {}, // filled by the API
    watchlist: [], // e.g. ["USD","KES"]
    amount: 100,
    currency: "USD",
};
const status = document.querySelector('#status')
const form = document.querySelector('#convert-form')
const result = document.querySelector('#result')
const watchList = document.querySelector('#watchlist')
const select = document.querySelector("#currency");
async function fetchRates() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/ETB')
        if (!res.ok) throw new Error(res.status)
        const data = await res.json()
        console.log(data);
        if (data.result == 'error') throw new Error(`${data.error - type}`)

        status.textContent = ""
        state.rates = data.rates
        render();
    } catch (error) {
        console.log(error)
    }
}
fetchRates()
const amount = document.querySelector("#amount")

async function render() {
    console.log('reder called');
    const codes = Object.keys(state.rates);
    select.innerHTML = codes.map(c => `<option>${c}</option>`).join("")
    select.value = state.currency;
    renderWatchList()
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const amountValue = Number(amount.value)
    if (!amountValue || amountValue <= 0) {
        result.textContent = 'Enter valid amount'
        return
    }
    const out = state.rates[state.currency] * amountValue
    result.textContent = `${amountValue} ETB =${out} ${state.currency}`
    renderWatchList();

    if (state.watchlist.includes(select.value))
        return
    state.watchlist.push(select.value)
   // save();
   console.log('calling render');
   
})

function renderWatchList() {
    console.log('called render');
    if (state.watchlist.length === 0) {
        watchList.innerHTML = "<li>No currencies yet</li>";
        return;
    }
    watchList.innerHTML = state.watchlist.map(c => {
        const r = state.rates[c];
        return `<li data-c="${c}">1 ETB = ${r} ${c}
<button class="rm">×</button></li>`;
    }).join("");

}
const KEY = 'watchlist'
function save() {
    localStorage.setItem(KEY, JSON.stringify({
        watchlist: state.watchlist,
        currency: state.currency
    }))
}
function load() {
    console.log(state);
    const saved = localStorage.getItem(KEY);
    if (saved) Object.assign(state, JSON.parse(saved));
    // console.log(saved);
    // console.log(state);
}
async function init() {
    load(); 

    render(); 
    await fetchRates(); 
}
init()