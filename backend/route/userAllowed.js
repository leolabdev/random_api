const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");
const userAllowedController = require("../controller/userAllowed");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/",[
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/),
    body("username", "Username can not be empty").notEmpty({ignore_whitespace: true})
], loginController.isLoggedIn, loginController.getUsername, userAllowedController.addUserAccess, util.handlePostResp);

router.get("/", loginController.isLoggedIn, loginController.getUsername, userAllowedController.getTables, util.handleGetResp);

router.delete("/", [
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/),
    body("username", "Username can not be empty").notEmpty({ignore_whitespace: true})
], loginController.isLoggedIn, loginController.getUsername, userAllowedController.deleteUserAccess, util.handleDeleteResp);

module.exports = router;