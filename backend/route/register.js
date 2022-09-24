const express = require("express");
const loginController = require("../controller/login");
const registerController = require("../controller/register");

const router = express.Router();

router.post("/", registerController.register, handleRegisterResp);
router.delete("/", loginController.isLoggedIn, loginController.getUsername, registerController.deleteUser, handleDeleteUserResp);

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