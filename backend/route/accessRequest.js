const express = require("express");
const loginController = require("../controller/login");
const accessRequestController = require("../controller/accessRequest");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/", loginController.isLoggedIn, loginController.getUsername, accessRequestController.createAccessRequest, util.handlePostResp);
router.get("/", loginController.isLoggedIn, loginController.getUsername, accessRequestController.getAccessRequests, util.handleGetResp);
router.delete("/", loginController.isLoggedIn, loginController.getUsername, accessRequestController.deleteAccessRequest, util.handleDeleteResp);

module.exports = router;