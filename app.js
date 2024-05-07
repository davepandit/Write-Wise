require('dotenv').config()

const express = require("express")
const path = require('path')
const userRoute = require('./routes/user')
const blogRoute = require('./routes/addBlog')
const connectDB = require('./db/connection')
const cookieParser = require('cookie-parser')
const {checkForCookie} = require('./middlewares/authentication')
const Blog = require('./models/blog.models')


const PORT = 8000

const app = express()

app.set('view engine' , 'ejs')
app.set('views' , path.resolve('./views'))

//middlewares section 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(checkForCookie("token"))
app.use(express.static(path.resolve('./public')))


app.get('/' , async(req , res)=>{
    const allBlogs = await Blog.find({})
    res.render('home',{
        user:req.user,
        allBlogs:allBlogs
    })
})

// database connection
connectDB()
.then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("error in connecting database:" , error)
})


// mongoose
// .connect('mongodb://127.0.0.1:27017/write-wise')
// .then(()=>{
//     console.log("MongoDb connected!!!!")
// })

app.use('/user' , userRoute)
app.use('/blog' , blogRoute)
