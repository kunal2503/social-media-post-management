const express =  require("express");
const {connectAccount, disconnectAccount} = require("../controllers/authControllers");

const router = express.Router();

router.post("/connect-account",connectAccount);
router.post("/disconnect-account",disconnectAccount);


module.exports =  router;