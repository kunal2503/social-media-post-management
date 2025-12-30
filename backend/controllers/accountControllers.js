const Accounts = require("../model/account");
const mongoose = require("mongoose");
const User = require("../model/user");
const platforms = require("../config/platforms");
const axios = require("axios");

exports.redirectToOAuth = async(req,res) =>{
    try{
        const {platform} = req.params;
        const platformConfig = platforms[platform.toLowerCase()];
        if(!platformConfig){
            return res.status(400).json({message : "Unsupported platform"});
        }
        const clientId = process.env[platformConfig.clientIdEnvVar];
        const redirectUrl = process.env[platformConfig.redirectUriEnvVar];
        const scope = platformConfig.scope;
        const authUrl = `${platformConfig.authUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=${encodeURIComponent(scope)}`;
        
        res.status(200).json({authUrl});

    } catch(error){
        console.log("Error :",error);
        res.status(500).json({message : "Internal Server Error"});
    }
}


exports.handleOAuthCallback = async(req,res) =>{
    try{
        const {platform} = req.params;
        const {code, state} = req.query;

        console.log("OAuth Callback received for platform:",platform);
        console.log("Authorization code:",code);
        if(!code){
            return res.status(400).json({message : "Authorization code missing"});
        }

        const platformConfig = platforms[platform.toLowerCase()];
        if (!platformConfig) {
            return res.status(400).json({ message: "Unsupported platform" });
        }

        const clientId = process.env[platformConfig.clientIdEnvVar];
        const clientSecret = process.env[platformConfig.clientSecretEnvVar];
        const redirectUri = process.env[platformConfig.redirectUriEnvVar];

        if (!clientId || !clientSecret || !redirectUri) {
            console.error("Missing environment variables for platform:", platform);
            return res.status(500).json({ message: "OAuth configuration error" });
        }

        // 🔁 Exchange code → access token
        let tokenParams = new URLSearchParams();
        tokenParams.append('client_id', clientId);
        tokenParams.append('client_secret', clientSecret);
        tokenParams.append('redirect_uri', redirectUri);
        tokenParams.append('code', code);
        tokenParams.append('grant_type', 'authorization_code');

        const tokenResponse = await axios.post(
            platformConfig.tokenUrl,
            tokenParams,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );

        console.log("Token response:", tokenResponse.data);
        
        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        // 🧠 Get userId from JWT token (from auth cookie or Authorization header)
        let userId = null;
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            console.warn("No auth token found in cookies or headers");
            return res.status(401).json({ mes sage: "User not authenticated. Please login first." });
        }

        try {
            const jwt = require("jsonwebtoken");
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            userId = decoded.userId || decoded._id;
            console.log("Decoded user ID:", userId);
        } catch (jwtError) {
            console.error("JWT verification failed:", jwtError.message);
            return res.status(401).json({ message: "Invalid authentication token" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID not found in token" });
        }

        // 🔒 Save or update connected account
        const account = await Accounts.findOneAndUpdate(
            { userId, platform },
            {
                userId,
                platform,
                accessToken: access_token,
                refreshToken: refresh_token || null,
                expiresAt: expires_in
                    ? new Date(Date.now() + expires_in * 1000)
                    : null,
                isConnected: true,
            },
            { upsert: true, new: true }
        );
        console.log("Account saved/updated:", account);

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const redirectUrl = `${frontendUrl}/accounts?success=true&platform=${platform}`;
        console.log("Redirecting to:", redirectUrl);
        res.redirect(redirectUrl);
    } catch(error){
        console.log("Error in OAuth callback:",error.message);
        res.status(500).json({message : "Internal Server Error", error: error.message});
    }
}

exports.disconnectAccount = async(req,res) =>{
    try{
        const {platform} = req.params;
        const userId = req.user._id;

        // Validate platform
        const platformConfig = platforms[platform.toLowerCase()];
        if (!platformConfig) {
            return res.status(400).json({ message: "Unsupported platform" });
        }

        // Find and delete connected account
        const account = await Accounts.findOneAndDelete(
            { userId, platform },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: "Account not connected" });
        }

        res.status(200).json({
            message: "Account disconnected successfully",
            platform
        });
    } catch(error){
        console.log("Error in disconnectAccount:",error);
        res.status(500).json({ message: "Internal Server Error" });
    }   
}