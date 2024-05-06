const mongoose = require('mongoose')

// database connection
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/write-wise');
        console.log(`Mongo db connceted!!!!`)

    } catch (error) {
        console.log("error:", error)
    }
    
}

module.exports = connectDB