const mongoose = require('mongoose')

// database connection
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}`);
        console.log(`Mongo db connceted!!!!`)

    } catch (error) {
        console.log("error:", error)
    }
    
}

module.exports = connectDB