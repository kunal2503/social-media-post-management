const mongoose = require("mongoose");

const account =  new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref  :"User"
    },
    platform : {
        type : String,
        required : true,
        enum : ["facebook", "x", "instagram","linkedin","youtube"]
    },
    accountName : {
        type : String,
        required : true
    }, 
    accountUrl : {
        type : String
    },
    accountId : {
        type : String,
        required : true
    },
    accessToken : {
        type : String,
    },
    refreshToken : {
        type : String,
    },
    expiresAt : {
        type :Date,
    },
    isActive : {
        type : Boolean,
        default : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})

module.exports =  mongoose.model("Account", account);