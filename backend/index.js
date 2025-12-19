require("dotenv").config()
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;


app.get("/",(req,res)=>{
    console.log("This is root");
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})