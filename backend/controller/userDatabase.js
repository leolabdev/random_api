const db = require("../util/DB");

exports.createTable = async (req, res, next) => {
    try{
        const username = req.username;

        if(username != null){
            const name = req.body.name;
            const description = req.body.description;
            const accessType = req.body.accessType || 0;
            const elems = req.body.elements;

            const selectTableNameQ = `SELECT name FROM UserDatabase WHERE username=? && name=?`;
            const selectTableResp = await db.makeQuery(selectTableNameQ, [username, name]);
            if(selectTableResp == null || selectTableResp.length === 0){
                const tableName = username + '_' + name;
                let createNewTableQ = `CREATE TABLE ${tableName} (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, value VARCHAR(100) NOT NULL)`;
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
                    const insertTokenQ = `INSERT INTO UserDatabase (username, name, description, accessType) VALUES (?, ?, ?, ?)`;
                    const resp = await db.makeQuery(insertTokenQ, [username, name, description, accessType]);

                    if(resp){
                        res.status(200);
                        res.isSuccess = true;
                    } else{
                        res.status(500);
                        res.isSuccess = false;
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

exports.getTables = async (req, res, next) => {
    try{
        const currentUsername = req.username;
        const isOwnTables = req.query.own;

        let resp;
        if(isOwnTables === 'true'){
            const selectTokenQ = `SELECT * FROM UserDatabase WHERE (username=?)`;
            resp = await db.makeQuery(selectTokenQ, currentUsername);
        }else{
            const selectTokenQ = `SELECT * FROM UserDatabase WHERE (accessType=0 OR accessType=1)`;
            resp = await db.makeQuery(selectTokenQ);
        }

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
            const selectQ = `SELECT * FROM UserDatabase WHERE username = ? AND name = ?`;
            const resp = await db.makeQuery(selectQ, [owner, tableName]);

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

exports.updateTable = async (req, res, next) => {
    try{
        const username = req.username;
        const tableName = req.body.name;

        if(username != null && tableName != null){
            const {name, description, accessType} = {...req.body};
            const tableInfoValues = {
                description: description || null,
                accessType: accessType || null
            }

            const tableOwnerQ = `SELECT username FROM UserDatabase WHERE username=? AND name=?`;
            const tableOwnerResp = await db.makeQuery(tableOwnerQ, [username, name]);
            if(tableOwnerResp != null && tableOwnerResp[0].username === username){
                const elems = req.body.elements;

                if(elems != null && elems.length > 0){
                    const tableName = username + '_' + name;
                    let dropTableQ = `DROP TABLE IF EXISTS ${tableName}`;
                    await db.makeQuery(dropTableQ);

                    const createTableQ = `CREATE TABLE ${tableName} (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, value VARCHAR(100) NOT NULL)`;
                    const createTableResp = await db.makeQuery(createTableQ);
                    if(createTableResp != null){
                        let insertElementsQ = `INSERT INTO ${tableName} (value) VALUES`;
                        for(let i=0; i<elems.length; i++)
                            insertElementsQ += ' ("' + elems[i] + '"),';
                        insertElementsQ = insertElementsQ.slice(0, -1);
                        insertElementsQ += ';';
                        await db.makeQuery(insertElementsQ);
                    }
                }

                let isQueryNeeded = false;
                let insertTokenQ = `UPDATE UserDatabase SET `;
                for(const key in tableInfoValues){
                    if(tableInfoValues[key] !== null && tableInfoValues[key] !== undefined && tableInfoValues[key] !== ''){
                        if(key !== 'accessType'){
                            insertTokenQ += key + '="' + tableInfoValues[key] + '", ';
                            isQueryNeeded = true;
                        } else {
                            insertTokenQ += key + '=' + tableInfoValues[key] + ', ';
                            isQueryNeeded = true;
                        }
                    }
                }

                let resp;
                if(isQueryNeeded){
                    insertTokenQ = insertTokenQ.slice(0, insertTokenQ.length-2);
                    insertTokenQ += ' WHERE username=? AND name=?';

                    resp = await db.makeQuery(insertTokenQ, [username, name]);
                }

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