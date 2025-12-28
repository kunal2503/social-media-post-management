const Accounts = require("../model/account");
const mongoose = require("mongoose");
const User = require("../model/user");

// Connect Social Media Account
exports.connectAccount = async (req, res) =>{
    try{
        
    } catch(error){
        console.log("Error :",error);
        res.status(500).json({message : "Internal server error"});
    }
}