const express = require("express");
const loginController = require("../controller/login");
const userAllowedController = require("../controller/userAllowed");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/", loginController.isLoggedIn, loginController.getUsername, userAllowedController.addUserAccess, util.handlePostResp);
router.get("/", loginController.isLoggedIn, userAllowedController.getTables, util.handleGetResp);

module.exports = router;