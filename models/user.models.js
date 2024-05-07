const mongoose = require("mongoose")
const {createHmac , randomBytes} = require("crypto")
const { create } = require("domain")
const { error } = require("console")
const {createJsonWebToken , validateJsonWebToken} = require('../services/token')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        required:true,
        default:'/images/defaultProfilePicture.png'
    },
    role:{
        type:String,
        enum:["USER" , "ADMIN"],
        default:"USER"
    }

},{
    timestamps:true
})

userSchema.pre('save' , function(next){
    const user = this

    if(!user.isModified('password')) return 

    //creating a salt 
    const salt = randomBytes(16).toString()
    const hash = createHmac('sha256' , salt)
    .update(user.password)
    .digest('hex')

    user.salt = salt
    user.password = hash

    next()

})


userSchema.static('matchPasswordAndGenerateToken' , async function(email , password){
    const user = await this.findOne({email})
    if(!user) throw new Error('User not found!!!')

    console.log('this is coming from models')
    console.log(user)

    const salt = user.salt
    const hash = user.password
    console.log('original pass:' , hash)

    const userGivenPassword = createHmac('sha256' , salt).update(password).digest('hex')
    console.log('usergiven pass:' , userGivenPassword)
    
    if(hash != userGivenPassword) throw new Error('Password not matched!!!!')

    const token = createJsonWebToken(user)
    return token

})

const User = mongoose.model('user' , userSchema)

module.exports = User