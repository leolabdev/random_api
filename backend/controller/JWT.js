const db = require("../util/DB");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");

exports.createJWT = async (req, res, next) => {
    try{
        const username = req.username;

        if(username != null){
            const selectUserTokens = 'SELECT * FROM JWT WHERE username = ?';
            const tokenResp = await db.makeQuery(selectUserTokens, username);
            const tokenNum = tokenResp.length + 1;
            const token = getDatabaseJWT(username, tokenNum);

            const insertTokenQ = `INSERT INTO JWT (token, username) VALUES (?, ?)`;
            const resp = await db.makeQuery(insertTokenQ, [token, username]);

            if(resp){
                res.status(200);
                res.isSuccess = true;
            } else{
                res.status(500);
                res.isSuccess = false;
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

exports.deleteJWT = async (req, res, next) => {
    try{
        const username = req.username;
        const token = req.body.token;

        if(username != null && token != null){
            const deleteTokenQ = 'DELETE FROM JWT WHERE username=? AND token=?';
            const resp = await db.makeQuery(deleteTokenQ, [username, token]);

            if(resp){
                res.status(200);
                res.isSuccess = true;
            } else{
                res.status(500);
                res.isSuccess = false;
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

exports.decodeJWT = async (token) => {
    try{
        return await promisify(jwt.verify)(token, process.env.JWT_DATABASE_SECRET);
    }catch(e){
        console.log("Problems with decoding");
        console.log(e);
        return null;
    }
}

function getDatabaseJWT(id, tokenNum) {
    return jwt.sign({ id: id, tokenNum: tokenNum }, process.env.JWT_DATABASE_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}