const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");
const jwtController = require("../controller/JWT");
const util = require('../util/reqResHandler');

const router = express.Router();

/**
 * Create a new API access token for the logged-in user, details are in swagger
 */
router.post("/", loginController.isLoggedIn, loginController.getUsername, jwtController.createJWT, util.handlePostResp);

/**
 * Get all API access tokens for the logged-in user, details are in swagger
 */
router.get("/", loginController.isLoggedIn, loginController.getUsername, jwtController.getJWT, util.handleGetResp);

/**
 * Delete a specified API access token from the logged-in user, details are in swagger
 */
router.delete("/", [
    body("token", "Token can not be empty").notEmpty({ignore_whitespace: true})
], loginController.isLoggedIn, loginController.getUsername, jwtController.deleteJWT, util.handleDeleteResp);

module.exports = router;