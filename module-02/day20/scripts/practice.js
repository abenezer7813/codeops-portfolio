async function forex(){
    try {
       const res=await fetch('https://api.frankfurter.dev/v2/rates?quotes=USD,ETB ')
       if(!res.ok) throw new Error(res.status)
       const data =await res.json()
       console.log(data[0].rate)
    } catch (error) {
        console.log(error)
    }
}
forex()
fetch('https://api.frankfurter.dev/v2/rates?quotes=USD,ETB ').then(res=>res.json()).then(data=>console.log(data[0].rate)).catch(err=>console.error(err))