// const add=function sum(num1,num2){
//     return num1+num2
// }

// console.log(add(12,32))





// const printer=value=>value
// console.log(printer("this is arrow function"))
// function makeGreeter(city) {
// // inner function "closes over" city
// return function (name) {
// return `Selam ${name}, from ${city}`;
// };
// }
// const addis = makeGreeter("Addis Ababa");
// console.log(addis("Almaz"))

// let min = m => {

//     let seconds = m * 60
//     let sec = () => seconds
//     return sec
// }
// let seconds = min(5)
// console.log(seconds())

function sum(n1,n2){
    return n1+n2
}
function sub(n1,n2){
    return n1-n2
}
function math(n1,n2,callback){
    return callback(n1,n2)
}

console.log(math(2,4,sum))
console.log(math(2,4,sub))