const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected")
        
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
    }

}

module.exports = connectDb;