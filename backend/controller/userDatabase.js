const db = require("../util/DB");
const jwt = require("jsonwebtoken");

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
        const username = req.username;

        if(username != null){
            const selectTokenQ = `SELECT name FROM UserDatabase WHERE username = ?`;
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

function getDatabaseJWT(id, tokenNum) {
    return jwt.sign({ id: id, tokenNum: tokenNum }, process.env.JWT_DATABASE_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}