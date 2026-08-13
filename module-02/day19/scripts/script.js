
const form = document.querySelector("#login-form");

const nameIn = document.querySelector("#name");
const passIn=document.querySelector('#pass')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
  const name = nameIn.value.trim();
  const pass=passIn.value.trim()
   console.log(document)
  console.log(name)
console.log(pass)
})