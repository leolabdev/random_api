const express = require("express");
const loginController = require("../controller/login");
const userDatabaseController = require("../controller/userDatabase");
const util = require('../util/reqResHandler');

const router = express.Router();

router.post("/", loginController.isLoggedIn, loginController.getUsername, userDatabaseController.createTable, util.handlePostResp);
router.get("/", loginController.isLoggedIn, loginController.getUsername, userDatabaseController.getTables, util.handleGetResp);
router.get('/\\S+', loginController.isLoggedIn, loginController.getUsername, userDatabaseController.getTable, util.handleGetResp);
router.delete('/', loginController.isLoggedIn, loginController.getUsername, userDatabaseController.deleteTable, util.handleDeleteResp);

module.exports = router;