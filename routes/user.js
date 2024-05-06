const express = require('express')
const router = express.Router()
const User = require('../models/user.models')

router.get('/signin' , (req , res)=>{
    return res.render('signin')
})

router.post('/signin' , async(req , res)=>{
    const {email , password} = req.body
    console.log('reached here!!!')
    const user = await User.matchPassword(email , password)
    console.log('reached second time!!!')
    console.log(user)

    console.log("User after authentication:" , user)

    return res.redirect('/')
})

router.get('/signup' , (req , res)=>{
    return res.render('signup')

})

router.post('/signup' , async(req , res)=>{
    const {fullName , email , password} = req.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect('/')
    
})

module.exports = router