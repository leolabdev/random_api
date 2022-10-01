const express = require("express");
const { body } = require("express-validator");

const loginController = require("../controller/login");
const registerController = require("../controller/register");

const router = express.Router();

router.post("/", [
    body("username", "Username can contain only letters and numbers and be at least 3 symbols long").isAlphanumeric().isLength({min: 3}),
    body("username", "Username can not be empty").notEmpty({ignore_whitespace: true}),
    body("password", "Password must contain contain no spaces").blacklist(" "),
    body("password", "Password can not be empty").notEmpty({ignore_whitespace: true})
], registerController.register, handleRegisterResp);

router.delete("/", [
    body("username", "Username can not be empty").notEmpty({ignore_whitespace: true}),
    body("password", "Password must contain contain no spaces").blacklist(" "),
    body("password", "Password can not be empty").notEmpty({ignore_whitespace: true})
], loginController.isLoggedIn, loginController.getUsername, registerController.deleteUser, handleDeleteUserResp);

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