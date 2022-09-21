const express = require("express");
const loginController = require("../controller/login");
const jwtController = require("../controller/JWT");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/", loginController.isLoggedIn, loginController.getUsername, jwtController.createJWT, util.handlePostResp);
router.get("/", loginController.isLoggedIn, loginController.getUsername, jwtController.getJWT, util.handleGetResp);

module.exports = router;