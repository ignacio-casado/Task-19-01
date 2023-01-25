

let Name = document.getElementById('name')
let price = document.getElementById('price')
let pic = document.getElementById('pic')
let send = document.getElementById('send')

let data = {}
send.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(Name.lenght !== 0 && price == Number && pic === true){
        data.push(Name, price, pic)
    }
})