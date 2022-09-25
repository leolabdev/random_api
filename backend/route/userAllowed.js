const express = require("express");
const loginController = require("../controller/login");
const userAllowedController = require("../controller/userAllowed");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/", loginController.isLoggedIn, loginController.getUsername, userAllowedController.addUserAccess, util.handlePostResp);
router.get("/", loginController.isLoggedIn, loginController.getUsername, userAllowedController.getTables, util.handleGetResp);
router.delete("/", loginController.isLoggedIn, loginController.getUsername, userAllowedController.deleteUserAccess, util.handleDeleteResp);

module.exports = router;