const db = require('./DB');

exports.nullJWTRequestCount = () => {
    try {
        const nullJWTRequestCountQ = `UPDATE jwt SET requestCount=0`;
        db.makeQuery(nullJWTRequestCountQ);
    } catch (e){
        console.log('Could not update jwt request count');
        console.log(e);
    }
}