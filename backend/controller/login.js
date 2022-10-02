const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const db = require("../util/DB");
const {validationResult} = require("express-validator");

/**
 * The function logs in user by creating jwt token and saving it to cookies.
 * It requires username and password fields, which must be sent in request's body as object: {username: "user login", password: "user password"}.
 * All data must be string-type.
 * Function also prints helpful hints to server console in case of problems.
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @return {Promise<void>}
 */
exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const selectUsernameQ = `SELECT username FROM User WHERE username = ?`;
            const resp = await db.makeQuery(selectUsernameQ, username);
            if (resp) {
                const isUserExist = resp.length !== 0;

                if (isUserExist) {
                    const selectUserQ = `SELECT * FROM User WHERE username = ?`;
                    const resp = await db.makeQuery(selectUserQ, username);

                    if (!resp || !(await bcrypt.compare(password, resp[0].password))) {
                        res.status(500);
                        res.isSuccess = false;
                    } else {
                        const id = resp[0].username;
                        createAccessCookie(id, req);
                        createUsernameCookie(id, req);
                        res.status(200);
                        res.isSuccess = true;
                    }
                } else {
                    res.status(500);
                    res.isSuccess = false;
                }
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
 * The Function checks is user logged in by examining jwt cookie.
 * In case then user wiped all cookies, this function will return error.
 * Function also prints helpful hints to server console in case of problems.
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @return {Promise<void>}
 */
exports.isLoggedIn = async (req, res, next) => {
    const jwtCookie = req.universalCookies.get('jwt');
    if(jwtCookie){
        try{
            const decoded = await promisify(jwt.verify)(jwtCookie, process.env.JWT_SECRET);
            try{
                const selectUsernameQ = `SELECT username FROM user WHERE username = ?`;
                const result = await db.makeQuery(selectUsernameQ, decoded.id);

                if(result){
                    req.result = result[0];
                } else{
                    console.log("No user found");
                }
            }catch(e){
                console.log("Problems with DB or connection");
                console.log(e);
            }
        }catch(e){
            console.log("Problems with getting cookie");
            console.log(e);
        }
    }

    next();
}

/**
 * The function adds username to the request object(username field) in case if he is logged in.
 * In case then user wiped all cookies, this function will return error.
 * The function also prints helpful hints to server console in case of problems.
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise}
 */
exports.getUsername = async (req, res, next) => {
    const jwtCookie = req.universalCookies.get('jwt');
    if(jwtCookie){
        try{
            const decoded = await promisify(jwt.verify)(jwtCookie, process.env.JWT_SECRET);
            req.username = decoded.id;
        }catch(e){
            console.log("Problems with getting cookie");
            console.log(e);
        }
    }

    next();
}

/**
 * The function logs out user by removing the jwt and username cookies.
 * @param req {object} request object
 * @param res {object} response object
 */
exports.logout = (req, res, next) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 2*1000),
        path: '/',
        httpOnly: true
    }

    req.universalCookies.set('jwt', 'logout', cookieOptions);
    req.universalCookies.set('username', 'bye', cookieOptions);

    res.isSuccess = true;
    next();
}

/**
 * The function creates a jwt token with username as a payload and save it to jwt cookie
 * @param id {string} username for the payload
 * @param req {object} request object
 */
function createAccessCookie(id, req) {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000 ),
        path: '/'
    };

    req.universalCookies.set('jwt', token, cookieOptions);
}

/**
 * The function creates a username cookie with provided id value
 * @param id {string} username to be saved to cookie
 * @param req {object} request object
 */
function createUsernameCookie(id, req) {
    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000 ),
        path: '/'
    };

    req.universalCookies.set('username', id, cookieOptions);
}