const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {redirectToOAuth, handleOAuthCallback, getConnectedAccounts} = require("../controllers/accountControllers");

router.get("/connect/:platform", authMiddleware, redirectToOAuth);
router.get("/auth/:platform/callback", authMiddleware, handleOAuthCallback);
router.get("/connected", authMiddleware, getConnectedAccounts);

module.exports = router;
