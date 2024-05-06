const express = require("express")
const path = require('path')
const userRoute = require('./routes/user')
const connectDB = require('./db/connection')

const PORT = 8000

const app = express()

app.set('view engine' , 'ejs')
app.set('views' , path.resolve('./views'))

//middlewares section 
app.use(express.urlencoded({extended:true}))


app.get('/' , (req , res)=>{
    res.render('home')
})

// database connection
connectDB()
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`Server is running on ${PORT}`)
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
