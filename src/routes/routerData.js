const router = require("express").Router()
const routerData = require('../controller/products.js')

router.get('/',routerData)

module.exports=router