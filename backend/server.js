const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const cookiesMiddleware = require('universal-cookie-express');

dotenv.config({path: '../.env'});

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}));
app.use(cookiesMiddleware());

app.use("/login", require("./route/login"));
app.use("/register", require("./route/register"));
app.use("/profile", require("./route/profile"));
app.use("/jwt", require("./route/JWT"));

app.listen(process.env.SERVER_PORT, () => {
    displayLinks();
});

function displayLinks(){
    console.log();
    console.log("----------------------");
    console.log(`HOME: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    console.log("----------------------");
    console.log();
}