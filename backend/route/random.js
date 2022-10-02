const express = require("express");
const randomController = require('../controller/random');
const reqResHandler = require('../util/reqResHandler');

const router = express.Router();

/**
 * Get random elements from a specified(username/tableName form) in the path user table, details are in swagger
 */
router.get("/\\S+/\\S+", randomController.makeRandomQuery, reqResHandler.handleGetResp);

module.exports = router;