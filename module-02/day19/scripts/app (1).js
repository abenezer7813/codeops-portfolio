// TODO: Hold items in an array (this is your single source of truth)
let items = [];

// TODO: Select necessary DOM elements (form, input, list, count)

// TODO: Write a render() function to rebuild the list from the array
// 1. Clear the current list (innerHTML = "")
// 2. Loop through the items array
// 3. Create elements, use data-id on each row, and append to the list
// 4. Update the live count paragraph
const itemList=document.querySelector('#list')
const form=document.querySelector('#add-form')
const input=document.querySelector('#name')
const count=document.querySelector('#count')

function render() {
  itemList.innerHTML=""
  items.map((item,index) =>{
    const list=document.createElement("li")
    list.dataset.id=index+1
    list.innerHTML = `
    <span>${item.name}</span>
    <button class="done">${item.done ? "Undo" : "Done"}</button>
    <button class="remove">Remove</button>
  `
    itemList.appendChild(list)
    count.textContent=items.length==1?`${items.length} item`:`${items.length} items`
  })
}

// TODO: Handle form submission
// 1. preventDefault to stop page reload
// 2. Read and validate the input
// 3. Push a new object to the items array (include a unique id and done: false)
// 4. Call render()
form.addEventListener('submit' ,(e)=>{
  e.preventDefault()
  const item=input.value.trim()
 items.push({
  name: item,
  done: false
})
  render()
  input.value=""
})

// TODO: Set up event delegation on the #list
// 1. Listen for clicks on the parent <ul>
// 2. Use e.target and closest() to find the clicked row
// 3. Determine if the user is toggling ".done" or removing a row
// 4. Update the items array accordingly
// 5. Call render()


itemList.addEventListener("click", (e) => {
  const row = e.target.closest("li");
  if (!row) return;

  const id = Number(row.dataset.id);
  const item = items.find(item => item.id === id);

  if (e.target.closest(".done")) {
    item.done = !item.done;
  }

  if (e.target.closest(".remove")) {
    items = items.filter(item => item.id !== id);
  }

  render();
});







