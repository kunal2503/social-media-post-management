const express =  require("express");
const {redirectToOAuth, handleOAuthCallback,disconnectAccount} = require("../controllers/accountControllers");
const {authMiddleWare} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/connect/:platform",redirectToOAuth);
router.get("/auth/:platform/callback",handleOAuthCallback);
router.get("/disconnect/:platform",authMiddleWare,disconnectAccount);

module.exports =  router;