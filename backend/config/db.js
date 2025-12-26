const mongoose = require("mongoose");

const URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/SMPS"

exports.connectDB = async()=>{
    try {
        await mongoose.connect(URL);
    } catch(error){
        console.log("Error while connecting to DB :",error)
    }
};

