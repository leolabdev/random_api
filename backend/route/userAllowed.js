const express = require("express");
const loginController = require("../controller/login");
const userAllowedController = require("../controller/userAllowed");
const util = require('../util/reqResHandler');

const router = express.Router();

router.get("/", loginController.isLoggedIn, loginController.getUsername, userAllowedController.getTables, util.handleGetResp);

module.exports = router;