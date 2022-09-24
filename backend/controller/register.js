const bcrypt = require("bcryptjs");

const db = require("../util/DB");

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

                    const userTablesQ = `SELECT name FROM UserDatabase WHERE username=?`;
                    const userTablesResp = await db.makeQuery(userTablesQ, username);
                    if(userTablesResp != null && userTablesResp.length > 0){
                        const tableDropQ = `DROP TABLE IF EXISTS ?`;
                        for(let i=0; i<userTablesResp.length; i++){
                            const name = userTablesResp[i].name;
                            const tableName = username + '_' + name;

                            const tableDropResp = await db.makeQuery(tableDropQ, tableName);
                            if(tableDropResp){
                                const deleteUserDatabaseQ = `DELETE FROM UserDatabase WHERE name=?`;
                                await db.makeQuery(deleteUserDatabaseQ, name);
                            }
                        }
                    }

                    const deleteUserQ = `DELETE FROM User WHERE username=?`;
                    const resp = await db.makeQuery(deleteUserQ, username);

                    if(resp){
                        res.status(200);
                        res.isSuccess = true;
                    }else{
                        res.status(500);
                        res.isSuccess = false;
                    }      
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