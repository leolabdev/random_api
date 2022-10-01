const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");
const userDatabaseController = require("../controller/userDatabase");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post('/',[
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/),
    body("elements", "elements field must contain an array").isArray()
], loginController.isLoggedIn, loginController.getUsername, userDatabaseController.createTable, util.handlePostResp);

router.get("/", loginController.isLoggedIn, loginController.getUsername, userDatabaseController.getTables, util.handleGetResp);
router.get('/\\S+', loginController.isLoggedIn, loginController.getUsername, userDatabaseController.getTable, util.handleGetResp);

router.put('/', [
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/)
], loginController.isLoggedIn, loginController.getUsername, userDatabaseController.updateTable, util.handlePutResp);

router.delete('/',[
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/)
], loginController.isLoggedIn, loginController.getUsername, userDatabaseController.deleteTable, util.handleDeleteResp);

module.exports = router;