const e = require("express")

let name = document.getElementById('name')
let price = document.getElementById('price')
let pic = document.getElementById('pic')
let send = document.getElementById('send')

let data = {}
send.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(name.lenght !== 0 && price == Number && pic === true){
        data.push(name, price, pic)
    }
})