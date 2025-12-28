const Users = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateAccessToken,generateRefreshToken} = require("../utils/generateToken");


exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "Email and Password are required"});
        }
        const userExists =  await Users.findOne({email});
        if(!userExists){
            return res.status(400).json({message : "user does not exist"});
        }
        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if(!isPasswordValid){
            return res.status(400).json({message : "Invalid credential"})
        }
        const accessToken = generateAccessToken(userExists._id);
        const refreshToken = generateRefreshToken(userExists._id);
        await userExists.save();
        userExists.refreshToken = refreshToken;

        res.status(201).cookie("accessToken", accessToken,{
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 15 * 60 * 1000 // 15 minutes
        }).cookie("refreshToken", refreshToken,{
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({message : "Login successfully"});
    } catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"});
    }
}

exports.signup = async (req,res)=>{
    try{
       const {username,email, password}  = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message : "All filed are required"});
        }
        const userExists = await Users.findOne({email});
        if(userExists){
            return res.status(400).json({message : "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new Users({
            username : username,
            email ,
            password : hashedPassword
        });

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);
        newUser.refreshToken = refreshToken;
        await newUser.save();
        console.log(newUser);
        console.log("Access Token :", accessToken);
        console.log("Refresh Token :", refreshToken);


        res.status(201).cookie("accessToken", accessToken,{
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 15 * 60 * 1000 // 15 minutes
        }).cookie("refreshToken", refreshToken,{
            httpOnly : true,
            secure : true,
            sameSite : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({message : "User created successfully"});
    } catch(error){
        console.log("Error at signup controller : ", error);
        res.status(500).json({message : "Internal server error"});
    }
}