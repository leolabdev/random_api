const db = require("../util/DB");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const {validationResult} = require("express-validator");

/**
 * The function adds new API access token for the logged-in user and saves it to the DB.
 * The request body does not need any fields
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise<void>}
 */
exports.createJWT = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const username = req.username;

            if (username != null) {
                const selectUserTokens = 'SELECT * FROM JWT WHERE username = ?';
                const tokenResp = await db.makeQuery(selectUserTokens, username);
                const tokenNum = tokenResp.length + 1;
                const token = getDatabaseJWT(username, tokenNum);

                const insertTokenQ = `INSERT INTO JWT (token, username)
                                      VALUES (?, ?)`;
                const resp = await db.makeQuery(insertTokenQ, [token, username]);

                if (resp) {
                    res.status(200);
                    res.isSuccess = true;
                } else {
                    res.status(500);
                    res.isSuccess = false;
                }
            } else {
                res.status(500);
                res.isSuccess = false;
            }
        } catch (e) {
            console.log("No connection to the DB or problems with query");
            console.log(e);
            res.status(500);
            res.isSuccess = false;
        }
    }

    next();
}

/**
 * The function searches and add to the response json object all the API access tokens for the logged-in user
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise<void>}
 */
exports.getJWT = async (req, res, next) => {
    try{
        const username = req.username;

        if(username != null){
            const selectTokenQ = `SELECT token FROM JWT WHERE username = ?`;
            const resp = await db.makeQuery(selectTokenQ, username);

            if(resp){
                res.status(200);
                res.isSuccess = true;
                if(resp.length > 0)
                    res.result = resp;
                else
                    res.result = [];
            }
        } else {
            res.status(500);
            res.isSuccess = false;
        }
    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.status(500);
        res.isSuccess = false;
    }

    next();
}

/**
 * The function deletes the specified in the request body API access token for the logged-in user
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise<void>}
 */
exports.deleteJWT = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const username = req.username;
            const token = req.body.token;

            if (username != null && token != null) {
                const deleteTokenQ = 'DELETE FROM JWT WHERE username=? AND token=?';
                const resp = await db.makeQuery(deleteTokenQ, [username, token]);

                if (resp) {
                    res.status(200);
                    res.isSuccess = true;
                } else {
                    res.status(500);
                    res.isSuccess = false;
                }
            } else {
                res.status(500);
                res.isSuccess = false;
            }
        } catch (e) {
            console.log("No connection to the DB or problems with query");
            console.log(e);
            res.status(500);
            res.isSuccess = false;
        }
    }

    next();
}

/**
 * The function decodes the provided API access token
 * @param token {string} the API access token to be decoded
 * @returns {Promise<unknown>}
 */
exports.decodeJWT = async (token) => {
    try{
        return await promisify(jwt.verify)(token, process.env.JWT_DATABASE_SECRET);
    }catch(e){
        console.log("Problems with decoding");
        console.log(e);
        return null;
    }
}

/**
 * The function creates and return an API access token
 * @param id {string} username of the token owner
 * @param tokenNum {integer} the order number of the token
 * @returns {string} an API access token for the specified user
 */
function getDatabaseJWT(id, tokenNum) {
    return jwt.sign({ id: id, tokenNum: tokenNum }, process.env.JWT_DATABASE_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}