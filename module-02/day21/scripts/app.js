
const form = document.querySelector('#contactForm')
const nameIn = document.querySelector("#userName")
const phoneIn = document.querySelector('#userPhone')
const error = document.querySelector('#errorArea')
let user = {}


function updateCounterDisplay() {

    
    const storedUsersRaw = localStorage.getItem('users') || '[]';

    
    const usersArray = JSON.parse(storedUsersRaw);
    console.log('userrrr' + storedUsersRaw)

    document.getElementById('signupCount').textContent = usersArray.length;
}

window.addEventListener('DOMContentLoaded', updateCounterDisplay);

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = nameIn.value.trim()
    const phone = phoneIn.value.trim()
    const pattern = /^(?:\+251|0)9\d{8}$/

    if (!name) {

        error.textContent = "Name field cannot be empty or let"
        return
    } else if (name.length<2) {
 error.textContent = "Name  length should be more than two letters "
        return
    }
    else if (!pattern.test(phone)) {
        error.textContent = "please enter valid phone number"
        return
    }

    const newEntry = {
        [nameIn.name]: nameIn.value.trim(),
        [phoneIn.name]: phoneIn.value.trim()
    };
    const existingEntries = JSON.parse(localStorage.getItem('users')) || [];
    existingEntries.push(newEntry);

    localStorage.setItem('users', JSON.stringify(existingEntries));

    form.reset()
})
