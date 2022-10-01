const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");
const accessRequestController = require("../controller/accessRequest");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/", [
    body("receiver", "receiver can contain only letters and numbers and be at least 3 symbols long").isAlphanumeric().isLength({min: 3}),
    body("receiver", "receiver can not be empty").notEmpty({ignore_whitespace: true}),
    body("tableName", "tableName can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/),
], loginController.isLoggedIn, loginController.getUsername, accessRequestController.createAccessRequest, util.handlePostResp);

router.get("/", loginController.isLoggedIn, loginController.getUsername, accessRequestController.getAccessRequests, util.handleGetResp);

router.delete("/",[
    body("id", "id can not be empty and must be an integer number").notEmpty().isNumeric(),
], loginController.isLoggedIn, loginController.getUsername, accessRequestController.deleteAccessRequest, util.handleDeleteResp);

module.exports = router;