const express = require("express");
const loginController = require("../controller/login");

const router = express.Router();

router.post("/", loginController.login, handleLoginResp);
router.get("/logout", loginController.logout, handleLogoutResp);

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