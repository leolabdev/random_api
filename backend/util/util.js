const db = require('./DB');

/**
 * The function set all API access tokens' request count in the database to be 0.
 */
exports.nullJWTRequestCount = () => {
    try {
        const nullJWTRequestCountQ = `UPDATE jwt SET requestCount=0`;
        db.makeQuery(nullJWTRequestCountQ);
    } catch (e){
        console.log('Could not update jwt request count');
        console.log(e);
    }
}