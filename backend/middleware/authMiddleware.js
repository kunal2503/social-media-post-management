const jwt =  require("jsonwebtoken");


exports.authMiddleWare = (req,res,next) =>{
    const token =  req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.userId;
        console.log("Authenticated user:", decoded);
        next();
    } catch(error){
        res.status(401).json({message : "Invalid token"});
    }
}