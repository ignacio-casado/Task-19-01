const { string } = require('i/lib/util')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect("mongodb//localhost:27017/userForm", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        unique: true, 
        require: true
    }

})
/* const productSchema = mongoose.Schema({

}) */
const userModel = mongoose.model('user', userSchema)
module.exports = userModel