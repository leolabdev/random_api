const express = require("express");
const { body } = require("express-validator");
const loginController = require("../controller/login");

const router = express.Router();

/**
 * Login user to the profile, details are in swagger
 */
router.post("/", [
    body("username", "Wrong username").isAlphanumeric().isLength({min: 3}),
    body("password", "Wrong password").blacklist(" ").notEmpty({ignore_whitespace: true})
], loginController.login, handleLoginResp);

/**
 * Logout user from the profile, details are in swagger
 */
router.get("/logout", loginController.logout, handleLogoutResp);

/**
 * The function sends response for the login request
 * @param req {object} request object
 * @param res {object} response object
 */
function handleLoginResp(req, res){
    if(res.isSuccess){
        res.json({
            hasAccess: true,
            message: "Logged in successfully"
        });
    } else{
        res.json({
            hasAccess: false,
            message: "Wrong username or password provided"
        });
    }

    res.end();
}

/**
 * The function sends response for the logout request
 * @param req {object} request object
 * @param res {object} response object
 */
function handleLogoutResp(req, res){
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Logged out successfully"
        });
    } else{
        res.json({
            hasAccess: false,
            message: "Could not log out"
        });
    }

    res.end();
}

module.exports = router;