const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");
const userDatabaseController = require("../controller/userDatabase");
const util = require('../util/reqResHandler');

const router = express.Router();

/**
 * Create new user table with id(auto increment) and value columns(VARCHAR(100)) and save its metadata, details are in swagger
 */
router.post('/',[
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/),
    body("elements", "elements field must contain an array").isArray()
], loginController.isLoggedIn, loginController.getUsername, userDatabaseController.createTable, util.handlePostResp);

/**
 * Get all tables metadata, which are visible(access type = 0 public or 1 by request), details are in swagger
 */
router.get("/", loginController.isLoggedIn, loginController.getUsername, userDatabaseController.getTables, util.handleGetResp);

/**
 * Get specified in the path table metadata, if the logged-in user has access to it, details are in swagger
 */
router.get('/\\S+', loginController.isLoggedIn, loginController.getUsername, userDatabaseController.getTable, util.handleGetResp);

/**
 * Update specified table elements or its metadata, details are in swagger
 */
router.put('/', [
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/)
], loginController.isLoggedIn, loginController.getUsername, userDatabaseController.updateTable, util.handlePutResp);

/**
 * Delete specified table and its metadata, details are in swagger
 */
router.delete('/',[
    body("name", "Name can not be empty and can not contain special characters").notEmpty({ignore_whitespace: true}).matches(/^[A-Za-z0-9]+$/)
], loginController.isLoggedIn, loginController.getUsername, userDatabaseController.deleteTable, util.handleDeleteResp);

module.exports = router;