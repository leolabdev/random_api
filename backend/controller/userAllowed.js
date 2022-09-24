const db = require("../util/DB");

exports.addUserAccess = async (req, res, next) => {
    try{
        const tableName = req.body.tableName;

        if(tableName){
            const selectTableQ = `SELECT * FROM UserDatabase WHERE name=?`;
            const tableResp = await db.makeQuery(selectTableQ, tableName);

            if(tableResp && tableResp.length > 0){
                const userToAdd = req.body.username;
                const owner = req.username; 
                const tableAccessType = tableResp[0].accesstype;

                let userAllowedResp;

                if(tableAccessType === 0 || owner === tableResp.username){
                    const userAllowedInsertQ = `INSERT INTO UserAllowed (id, username) VALUES (?, ?)`;
                    userAllowedResp = await db.makeQuery(userAllowedInsertQ, [tableResp[0].id, userToAdd]);
                }
                
                if(userAllowedResp){
                    res.status(200);
                    res.isSuccess = true;
                } else{
                    res.status(500);
                    res.isSuccess = false;
                }
            }
        }else {
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

exports.getTables = async (req, res, next) => {
    try{
        const username = req.query.username;

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

exports.deleteUserAccess = async (req, res, next) => {
    try{
        const tableName = req.body.tableName;

        if(tableName){
            const selectTableQ = `SELECT * FROM UserDatabase WHERE name=?`;
            const tableResp = await db.makeQuery(selectTableQ, tableName);

            if(tableResp && tableResp.length > 0){
                const userToDelete = req.body.username;
                const currentUsername = req.username;

                let userAllowedResp;

                if(currentUsername === userToDelete){
                    const userAllowedInsertQ = `DELETE FROM UserAllowed WHERE id=? AND name=?`;
                    userAllowedResp = await db.makeQuery(userAllowedInsertQ, [tableResp[0].id, userToDelete]);
                }
                
                if(userAllowedResp){
                    res.status(200);
                    res.isSuccess = true;
                } else{
                    res.status(500);
                    res.isSuccess = false;
                }
            }
        }else {
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