const faker = require('faker')

class Product {
    constructor(name,description,price,image){
        this.name=name;
        this.description=description;
        this.price=price;
        this.image=image;
    }


}
//copiado
const bringArray= (req,res)=>{
    //valida que se pasen los objetos de request y response
    if (Object.prototype.toString.call(req) !== '[object Object]') throw new Error("missing data")
    if (!("render" in res)) throw new Error("res should be an object")
    const product =[]
    for (let i=0;i<5;i++){
        product.push(new Product(faker.commerce.productName(),faker.commerce.productDescription() ,faker.commerce.price(),faker.image.business(200,200,true)))
    }
    res.render("home",{products:product})
    return product
    }
    console.log(bringArray)
    module.exports=bringArray