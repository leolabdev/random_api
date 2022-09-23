const db = require("../util/DB");

exports.createTable = async (req, res, next) => {
    try{
        const username = req.username;

        if(username != null){
            const name = req.body.name;
            const description = req.body.description;
            const elems = req.body.elements;

            const tableName = username + '_' + name;
            let createNewTableQ = `CREATE TABLE ${tableName} (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, value VARCHAR(255) NOT NULL)`;
            const createResp = await db.makeQuery(createNewTableQ);
            let insertElemResp = null;
            if(createResp){
                let insertElementsQ = `INSERT INTO ${tableName} (value) VALUES`;

                for(let i=0; i<elems.length; i++)
                    insertElementsQ += ' ("' + elems[i] + '"),'
                insertElementsQ = insertElementsQ.slice(0, -1);
                insertElementsQ += ';';
                insertElemResp = await db.makeQuery(insertElementsQ);
            }

            if(insertElemResp){
                const insertTokenQ = `INSERT INTO UserDatabase (username, name, description) VALUES (?, ?, ?)`;
                const resp = await db.makeQuery(insertTokenQ, [username, name, description]);

                const tableId = resp.insertId;
                const insertUserAllowedQ = `INSERT INTO UserAllowed (id, username) VALUES (?, ?)`;
                await db.makeQuery(insertUserAllowedQ, [tableId, username]);

                if(resp){
                    res.status(200);
                    res.isSuccess = true;
                } else{
                    res.status(500);
                    res.isSuccess = false;
                }
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

exports.getTables = async (req, res, next) => {
    try{
        const username = req.query.username;

        let selectTokenQ;
        if(username != null)
            selectTokenQ = `SELECT * FROM UserDatabase WHERE username = ?`;
        else
            selectTokenQ = `SELECT * FROM UserDatabase`;

        const resp = await db.makeQuery(selectTokenQ, username)
        if(resp){
            res.status(200);
            res.isSuccess = true;
            res.result = resp;
        }
    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.status(500);
        res.isSuccess = false;
    }

    next();
}

exports.getTable = async (req, res, next) => {
    try{
        const owner = req.query.owner;
        const tableName = req.path.replace(/\//, '');

        if(owner != null){
            const selectTokenQ = `SELECT * FROM UserDatabase WHERE username = ? AND name = ?`;
            const resp = await db.makeQuery(selectTokenQ, [owner, tableName]);

            if(resp){
                const selectUserCountQ = `SELECT COUNT(id) FROM UserAllowed WHERE id = ?`;
                const count = await db.makeQuery(selectUserCountQ, resp[0].id);
                resp[0].userCount = count[0]['COUNT(id)'];

                res.status(200);
                res.isSuccess = true;
                if(resp.length > 0)
                    res.result = resp[0];
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

exports.deleteTable = async (req, res, next) => {
    try{
        const username = req.username;

        if(username != null){
            const name = req.body.name;

            const tableName = username + '_' + name;

            let deleteTableQ = `DROP TABLE ${tableName}`;
            const deleteResp = await db.makeQuery(deleteTableQ);

            if(deleteResp){
                const selectTableQ = `SELECT id FROM UserDatabase WHERE name=?`;
                const selectTableResp = await db.makeQuery(selectTableQ, name);
                if(selectTableResp && selectTableResp.length > 0){
                    const tableId = selectTableResp[0].id;
                    const deleteUserAllowedQ = `DELETE FROM UserAllowed WHERE id=?`;
                    const deleteUserAllowedResp = await db.makeQuery(deleteUserAllowedQ, tableId);

                    if(deleteUserAllowedResp){
                        const deleteUserAllowedQ = `DELETE FROM UserDatabase WHERE name=?`;
                        const deleteUserDatabaseResp = await db.makeQuery(deleteUserAllowedQ, name);
                        if(deleteUserDatabaseResp){
                            res.status(200);
                            res.isSuccess = true;
                        } else{
                            res.status(500);
                            res.isSuccess = false;
                        }
                    }
                }
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