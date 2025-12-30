require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const authRoutes =  require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/auth/v1",authRoutes);
app.use("/api/account/v1",accountRoutes);


connectDB()
.then(()=>{
    console.log("Connected Successfully");
}).catch((error)=>{
    console.log("Error while connecting to DB:",error);
})

app.get("/",(req,res)=>{
    console.log("This is root");
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})