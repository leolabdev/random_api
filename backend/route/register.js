const express = require("express");
const { body } = require("express-validator");

const loginController = require("../controller/login");
const registerController = require("../controller/register");

const router = express.Router();

/**
 * Register a new user profile, details are in swagger
 */
router.post("/", [
    body("username", "Username can contain only letters and numbers and be at least 3 symbols long").isAlphanumeric().isLength({min: 3}),
    body("username", "Username can not be empty").notEmpty({ignore_whitespace: true}),
    body("password", "Password must contain contain no spaces").blacklist(" "),
    body("password", "Password can not be empty").notEmpty({ignore_whitespace: true})
], registerController.register, handleRegisterResp);

/**
 * Delete a specified user profile and all data and tables related to it, details are in swagger
 */
router.delete("/", [
    body("username", "Username can not be empty").notEmpty({ignore_whitespace: true}),
    body("password", "Password must contain contain no spaces").blacklist(" "),
    body("password", "Password can not be empty").notEmpty({ignore_whitespace: true})
], loginController.isLoggedIn, loginController.getUsername, registerController.deleteUser, handleDeleteUserResp);

/**
 * The function sends response for the register user request
 * @param req {object} request object
 * @param res {object} response object
 */
function handleRegisterResp(req, res){
    if(res.isSuccess){
        res.json({
            result: "Username was registered"
        });
    } else{
        res.json({
            result: "Registration failed, try again"
        });
    }

    res.end();
}

/**
 * The function sends response for the delete user profile request
 * @param req {object} request object
 * @param res {object} response object
 */
function handleDeleteUserResp(req, res){
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "User has been deleted"
        });
    } else{
        res.json({
            isSuccess: false,
            message: "User has not been deleted, try again later"
        });
    }

    res.end();
}

module.exports = router;