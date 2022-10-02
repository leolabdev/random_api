const db = require("../util/DB");
const {validationResult} = require("express-validator");

/**
 * The function adds access to the specified table for the specified username
 * The user giving the access for the table must be the table owner (= be logged-in as the table owner or have valid jwt cookie)
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise}
 */
exports.addUserAccess = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const tableName = req.body.name;

            if (tableName) {
                const selectTableQ = `SELECT * FROM UserDatabase WHERE name = ?`;
                const tableResp = await db.makeQuery(selectTableQ, tableName);

                if (tableResp && tableResp.length > 0) {
                    const userToAdd = req.body.username;
                    const owner = req.username;
                    const tableAccessType = tableResp[0].accessType;

                    if (tableAccessType === 0 || owner === tableResp[0].username) {
                        const userAllowedInsertQ = `INSERT INTO UserAllowed (id, username) VALUES (?, ?)`;
                        const userAllowedResp = await db.makeQuery(userAllowedInsertQ, [tableResp[0].id, userToAdd]);

                        if (userAllowedResp) {
                            res.status(200);
                            res.isSuccess = true;
                        } else {
                            res.status(500);
                            res.isSuccess = false;
                        }
                    }


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
 * The function searches and adds to the response json object all tables to which logged-in user has access (=has jwt cookie)
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise}
 */
exports.getTables = async (req, res, next) => {
    try{
        const username = req.username;

        if(username != null){
            const selectTokenQ = `SELECT * FROM UserAllowed WHERE username = ?`;
            const respAllowed = await db.makeQuery(selectTokenQ, username);

            if(respAllowed && respAllowed.length > 0) {
                let selectUserDatabaseQ = `SELECT username, name FROM UserDatabase WHERE `;
                for(let i=0; i<respAllowed.length; i++)
                    selectUserDatabaseQ += 'id="' + respAllowed[i].id + '" OR ';
                selectUserDatabaseQ = selectUserDatabaseQ.slice(0, selectUserDatabaseQ.length-3);
                selectUserDatabaseQ += ';';

                const respUserDatabase = await db.makeQuery(selectUserDatabaseQ, username);
                res.result = respUserDatabase;
                res.status(200);
                res.isSuccess = true;
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
 * The function removes user access from the specified username for the specified table.
 * The user removing the access must be the table owner or the user, from which access is removing (= be logged-in as the table owner or have valid jwt cookie)
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise}
 */
exports.deleteUserAccess = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const tableName = req.body.name;

            if (tableName) {
                const selectTableQ = `SELECT * FROM UserDatabase WHERE name = ?`;
                const tableResp = await db.makeQuery(selectTableQ, tableName);

                if (tableResp && tableResp.length > 0) {
                    const userToDelete = req.body.username;
                    const currentUsername = req.username;
                    const tableOwner = tableResp[0].username;

                    if (currentUsername === userToDelete || tableOwner === currentUsername) {
                        const userAllowedInsertQ = `DELETE FROM UserAllowed WHERE id = ? AND username = ?`;
                        const userAllowedResp = await db.makeQuery(userAllowedInsertQ, [tableResp[0].id, userToDelete]);

                        if (userAllowedResp) {
                            res.status(200);
                            res.isSuccess = true;
                        } else {
                            res.status(500);
                            res.isSuccess = false;
                        }
                    }
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