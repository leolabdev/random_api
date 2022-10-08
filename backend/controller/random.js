const db = require("../util/DB");
const random = require("../util/random");
const jwtController = require("../controller/JWT");

/**
 * The function fetches count of random elements specified in the query params from the specified table and adds it to the response json object.
 * If no elements count specified, it will be equal to the total amount of elements in the table.
 * The following requirements must be met in order to function fetches the data:
 * A valid API access token must be provided and its day requests limit must not be exceeded
 * The user must have access to the table or be owner of the table
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function} next function
 * @returns {Promise<void>}
 */
exports.makeRandomQuery = async (req, res, next) => {
    try{
        const path = req.path;
        let owner = '', name = '';
        for(let i=1; i<path.length; i++){
            if(path[i] === '/'){
                owner = path.slice(1, i);
                name = path.slice(i+1);
                break;
            }
        }
        const tableName = owner + '_' + name;

        let hasAccess = false;
        let token = req.query.token;
        if(token != null && token !== '' && tableName != null && tableName !== ''){
            const decoded = await jwtController.decodeJWT(token);
            const username = decoded.id;

            if(username === owner){
                hasAccess = true;
            } else if(username != null && username !== ''){
                const tableInfoQ = `SELECT id, accessType FROM UserDatabase WHERE username=? AND name=?`;
                const tableInfoResp = await db.makeQuery(tableInfoQ, [owner, name]);
                
                if(tableInfoResp != null && tableInfoResp.length > 0){
                    if(tableInfoResp[0].accessType === 0){
                        hasAccess = true;
                    } else{
                        const checkAccessQ = `SELECT * FROM UserAllowed WHERE username=? AND id=?`;
                        const checkAccessResp = await db.makeQuery(checkAccessQ, [username, tableInfoResp[0].id]);
                        if(checkAccessResp != null && checkAccessResp.length > 0){
                            if(checkAccessResp[0].username === username && checkAccessResp[0].id === tableInfoResp[0].id){
                                hasAccess = true;
                            }
                        }
                    }
                }
            }
        }

        let count = req.query.count;
        if(count == null || count === '0'){
            const countQ = `SELECT COUNT(id) FROM ${tableName}`;
            const countResp = await db.makeQuery(countQ);
            if(countResp != null && countResp.length > 0)
                count = countResp[0]['COUNT(id)'];
            else{
                res.status(500);
                res.isSuccess = false;
                next();
            }
        }
        count = parseInt(count);

        let requestLimitExited = true;
        if(hasAccess){
            const decoded = await jwtController.decodeJWT(token);
            const username = decoded.id;

            const requestCountQ = `SELECT requestCount FROM jwt WHERE token=? AND username=?`;
            const requestCountResp = await db.makeQuery(requestCountQ, [token, username]);

            if(requestCountResp != null && requestCountResp.length > 0){
                const reqCountLeft = process.env.JWT_MAX_REQ_COUNT - (count+requestCountResp[0].requestCount);

                if(reqCountLeft >= 0){
                    requestLimitExited = false;
                    const requestsDone = count + requestCountResp[0].requestCount;
                    const updateReqCount = `UPDATE jwt SET requestCount=? WHERE token=?`;
                    await db.makeQuery(updateReqCount, [requestsDone, token]);
                }
            }
        }

        if(hasAccess && !requestLimitExited){
            const engine = req.query.engine;
            const minIdQ = `SELECT MIN(id) FROM ${tableName}`;
            const maxIdQ = `SELECT MAX(id) FROM ${tableName}`;

            const minIdResp = await db.makeQuery(minIdQ);
            const maxIdResp = await db.makeQuery(maxIdQ);

            if(minIdResp && maxIdResp && minIdResp.length > 0 && maxIdResp.length > 0){
                const minId = minIdResp[0]['MIN(id)'];
                const maxId = maxIdResp[0]['MAX(id)'];

                const randIntArr = random.generateRandIntArr(minId, maxId, count, engine);

                if(randIntArr != null && randIntArr.length > 0){
                    const range = maxId-minId+1;

                    let result = [];
                    if(range > count){
                        let previousSliceIndex = 0;
                        for(let i=0; i<randIntArr.length; i++){
                            if((i%100 === 0 && i !== 0) || i === randIntArr.length-1){
                                const selectElemsQ = random.getRandomSQLQuery(tableName, 'id', false, randIntArr.slice(previousSliceIndex, i+1));
                                previousSliceIndex = i;

                                const selectElemsResp = await db.makeQuery(selectElemsQ);
                                if(selectElemsResp != null && selectElemsResp.length > 0){
                                    const respObj = convertArrToObjId(selectElemsResp);
                                    for(let i=0; i<selectElemsResp.length; i++){
                                        result[i] = respObj[randIntArr[i]];
                                    }
                                }
                            }
                        }
                    }else{
                        const selectElemsQ = `SELECT * FROM ${tableName}`;
                        const selectElemsResp = await db.makeQuery(selectElemsQ);
                        if(selectElemsResp != null && selectElemsResp.length > 0){
                            for(let i=0; i<count; i++){
                                result[i] = selectElemsResp[randIntArr[i]-1];
                            }
                        }
                    }

                    res.result = result;
                }
            }

            res.status(200);
            res.isSuccess = true;

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

function convertArrToObjId(arr){
    const result = {};
    for(let i=0; i< arr.length; i++){
        const id = arr[i].id;
        result[id] = arr[i];
    }

    return result;
}