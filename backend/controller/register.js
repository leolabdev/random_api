const bcrypt = require("bcryptjs");
const axios = require('axios').default;

const db = require("../util/DB");
const loginController = require("../controller/login");

exports.register = async (req, res, next) => {
    try{
        const {username, password} = req.body;

        const selectUsernameQ = `SELECT username FROM user WHERE username = ?`;
        const resp = await db.makeQuery(selectUsernameQ, username);
        const isUserExist = resp.length !== 0;

        if(!isUserExist){
            const hashedPassword = await bcrypt.hash(password, 8);
            const insertUserQ = `INSERT INTO user (username, password) VALUES (?, ?)`;
            await db.makeQuery(insertUserQ, [username, hashedPassword]);
            res.status(200);
            res.isSuccess = true;
        } else {
            res.status(500);
            res.isSuccess = false;
        }
    } catch (e){
        console.log('No connection to the DB or problems with query');
        res.isSuccess = false;
    }

    next();
}

exports.deleteUser = async (req, res, next) => {
    try{
        const usernameCookie = req.username;
        const {username, password} = req.body;

        if(usernameCookie != null && username != null && password != null && username === usernameCookie){
            const selectUserQ = `SELECT * FROM user WHERE username=?`;
            const selectUserResp = await db.makeQuery(selectUserQ, username);
            const isUserExist = selectUserResp.length !== 0;

            if(isUserExist){
                if(await bcrypt.compare(password, selectUserResp[0].password)){
                    const deleteJWTQ = `DELETE FROM JWT WHERE username=?`;           
                    await db.makeQuery(deleteJWTQ, username);

                    const deleteUserAllowedQ = `DELETE FROM UserAllowed WHERE username=?`;
                    await db.makeQuery(deleteUserAllowedQ, username);

                    const deleteAccessRequestQ = `DELETE FROM AccessRequest WHERE sender=? OR receiver=?`;
                    await db.makeQuery(deleteAccessRequestQ, [username, username]);

                    const userTablesQ = `SELECT * FROM UserDatabase WHERE username=?`;
                    const userTablesResp = await db.makeQuery(userTablesQ, username);
                    if(userTablesResp != null && userTablesResp.length > 0){
                        for(let i=0; i<userTablesResp.length; i++){
                            const name = userTablesResp[i].name;
                            const tableName = username + '_' + name;

                            const tableDropQ = `DROP TABLE IF EXISTS ${tableName}`;
                            const tableDropResp = await db.makeQuery(tableDropQ, tableName);
                            if(tableDropResp){
                                const deleteAllUserAllowedQ = `DELETE FROM UserAllowed WHERE id=?`;
                                await db.makeQuery(deleteAllUserAllowedQ, userTablesResp[i].id);

                                const deleteUserDatabaseQ = `DELETE FROM UserDatabase WHERE name=?`;
                                await db.makeQuery(deleteUserDatabaseQ, name);
                            }
                        }
                    }

                    const deleteUserQ = `DELETE FROM User WHERE username=?`;
                    await db.makeQuery(deleteUserQ, username);

                    await loginController.logout(req, res, next);
                }
            } else {
                res.status(500);
                res.isSuccess = false;
            }
        }
    } catch (e){
        console.log('No connection to the DB or problems with query');
        res.isSuccess = false;
    }

    next();
}