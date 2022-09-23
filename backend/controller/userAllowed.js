const db = require("../util/DB");

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