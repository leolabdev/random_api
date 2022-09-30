require("dotenv").config({path: '../.env'});

const express = require('express');
const cors = require('cors');
const cookiesMiddleware = require('universal-cookie-express');
const util = require('./util/util');

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}));
app.use(cookiesMiddleware());

app.use("/login", require("./route/login"));
app.use("/register", require("./route/register"));
app.use("/jwt", require("./route/JWT"));
app.use("/userDatabase", require("./route/userDatabase"));
app.use("/userAllowed", require("./route/userAllowed"));
app.use("/accessRequest", require("./route/accessRequest"));
app.use("/rand", require("./route/random"));

app.listen(process.env.SERVER_PORT, () => {
    displayLinks();

    util.nullJWTRequestCount();

    //null all jwt tokens requests count once a day = 86400000ms
    setInterval(() => {
        util.nullJWTRequestCount();
    } , 86400000);
});

function displayLinks(){
    console.log();
    console.log("----------------------");
    console.log(`HOME: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    console.log("----------------------");
    console.log();
}

function generateNumStrings(start, end){
    const result = [];
    for(let i=start; i<end; i++)
        result.push(i+'');

    return result;
}