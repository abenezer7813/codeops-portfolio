const out = document.querySelector("#facts");
const name='ethiopia'
async function showCountry(name) {
out.textContent = "Loading...";
try {
const res = await fetch(`https://api.restcountries.com/countries/v5?q=${name}`,
  { headers: { 'Authorization': 'Bearer rc_live_a7e60e9639b44ef996c3408c8a8246fc'}
   } )
if (!res.ok) throw new Error("Country not found");
const [c] = await res.json();
out.innerHTML = "";
render(out, "Capital", c.capital[0]); // "Addis Ababa"
render(out, "Population", c.population.toLocaleString());
render(out, "Region", c.region);
} catch (err) {
out.textContent = err.message; // friendly error
}
}
showCountry("ethiopia"); // default on load

function render(out ,info,data){
    const list=document.createElement('li')
    list.textContent=`${info} :${data}`
    out.appendChild(list)
}
async function country() {
    const response = await fetch(
    'https://api.restcountries.com/countries/v5?q=stan&limit=5&pretty=1',
    { headers: { 'Authorization': 'Bearer rc_live_a7e60e9639b44ef996c3408c8a8246fc' } }
);
const data = await response.json();
console.log(data)
    
}
country()