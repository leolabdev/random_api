const { validationResult } = require("express-validator");
const db = require("../util/DB");

exports.createAccessRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const username = req.username;

            if (username != null) {
                const {receiver, tableName, message} = {...req.body};
                const values = [username, receiver, tableName, message];
                let isNullValue = false;
                for (let i = 0; i < values.length - 1; i++) {
                    if (values[i] == null) {
                        isNullValue = true;
                        break;
                    }
                }

                if (!isNullValue) {
                    const checkIsRequestExist = `SELECT *
                                                 FROM AccessRequest
                                                 WHERE sender = ?
                                                   AND receiver = ?
                                                   AND tableName = ?`;
                    const isRequestExist = await db.makeQuery(checkIsRequestExist, [username, receiver, tableName]);

                    if (isRequestExist != null && isRequestExist.length === 0) {
                        const createRequestQ = `INSERT INTO AccessRequest (sender, receiver, tableName, message)
                                                VALUES (?, ?, ?, ?)`;
                        const resp = await db.makeQuery(createRequestQ, values);
                        if (resp) {
                            res.status(200);
                            res.isSuccess = true;
                        }
                    }
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

exports.getAccessRequests = async (req, res, next) => {
    try{
        const username = req.username;

        if(username != null){
            const selectRequestsQ = `SELECT * FROM AccessRequest WHERE receiver=?`;
            const selectRequestsResp = await db.makeQuery(selectRequestsQ, username);
            if(selectRequestsResp != null && selectRequestsResp.length > 0){
                res.result = selectRequestsResp;
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

exports.deleteAccessRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        try {
            const username = req.username;
            const id = req.body.id;

            if (username != null && id !== null && id !== undefined) {
                const deleteRequestQ = `DELETE
                                        FROM AccessRequest
                                        WHERE id = ?
                                          AND receiver = ?`;
                const deleteRequestResp = await db.makeQuery(deleteRequestQ, [id, username]);
                if (deleteRequestResp != null) {
                    res.status(200);
                    res.isSuccess = true;
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