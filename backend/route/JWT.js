const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");
const jwtController = require("../controller/JWT");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/", loginController.isLoggedIn, loginController.getUsername, jwtController.createJWT, util.handlePostResp);

router.get("/", loginController.isLoggedIn, loginController.getUsername, jwtController.getJWT, util.handleGetResp);

router.delete("/", [
    body("token", "Token can not be empty").notEmpty({ignore_whitespace: true})
], loginController.isLoggedIn, loginController.getUsername, jwtController.deleteJWT, util.handleDeleteResp);

module.exports = router;