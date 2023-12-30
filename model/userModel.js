const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:String,
    email:String,
    age:Number
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel