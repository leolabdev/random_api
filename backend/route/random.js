const express = require("express");
const randomController = require('../controller/random');
const reqResHandler = require('../util/reqResHandler');

const router = express.Router();

router.get("/\\S+/\\S+", randomController.makeRandomQuery, reqResHandler.handleGetResp);

module.exports = router;