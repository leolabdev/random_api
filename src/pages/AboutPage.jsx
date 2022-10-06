import React from 'react';

/**
 * About page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function AboutPage(props) {
    return (
        <div>
            <>
                <h1>Random API</h1>
                <h2>About project</h2>
                <p>
                    In daily programming we often need some placeholder data. Such cases are for
                    example HTML form to which we need to add examples for user or may be we
                    need to find a name for a bot in a game. Whatever the case might be the
                    Random API is a solution for all such headache.
                </p>
                <p>
                    Random API lets you add any kind of data to an API and use it later as you
                    wish. For example you often need to use any random firstname-lastname pair.
                    All you need to do is simply create a SQL table with firstnames, create a
                    table with lastnames and use it via handy API requests. All of that can be
                    via great UI.
                </p>
                <p>
                    Below you can see detailed instractions of how to get started and overall
                    documentation of the project in case you wish to modify it. I hope you enjoy
                    use of that piece of software.
                </p>
                <h2>Getting started</h2>
                <ol>
                    <li>Create a database</li>
                </ol>
                <p>
                    In the root folder you find DBScript.sql file open it and copy all of the
                    content. Open your SQL database in the terminal and paste the content of the
                    file. When it is done you have a database.
                </p>
                <ol start={2}>
                    <li>Configure .env file</li>
                </ol>
                <p>
                    In the root folder you find .env file Open it and change values if needed:
                </p>
                <table>
                    <thead>
                    <tr>
                        <th>Field name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>DATABASE_NAME</td>
                        <td>name of your database, random_api is default</td>
                    </tr>
                    <tr>
                        <td>DATABASE_USER</td>
                        <td>username of your SQL database</td>
                    </tr>
                    <tr>
                        <td>DATABASE_PASSWORD</td>
                        <td>password for the username</td>
                    </tr>
                    <tr>
                        <td>SERVER_HOST</td>
                        <td>hostname, localhost is default</td>
                    </tr>
                    <tr>
                        <td>SERVER_PORT</td>
                        <td>port number, where you wish to run API</td>
                    </tr>
                    <tr>
                        <td>JWT_SECRET</td>
                        <td>encryption word for profile passwords, may be any word</td>
                    </tr>
                    <tr>
                        <td>JWT_DATABASE_SECRET</td>
                        <td>encryption word for API access keys, may be any word</td>
                    </tr>
                    <tr>
                        <td>JWT_EXPIRES_IN</td>
                        <td>
                            time, after you will be logget out from your profile = cookie for
                            access to your profile expires. Example 30d = 30 days
                        </td>
                    </tr>
                    <tr>
                        <td>JWT_COOKIE_EXPIRES</td>
                        <td>time, after your API access token expires. Example 30 = 30 days</td>
                    </tr>
                    <tr>
                        <td>CORS_ORIGIN</td>
                        <td>
                            base URL of your application = where your application (UI) is running,{" "}
                            <a href="http://localhost:3000">http://localhost:3000</a> is default
                        </td>
                    </tr>
                    <tr>
                        <td>REACT_APP_SERVER_HOST</td>
                        <td>
                            hostname should be the same as SERVER_HOST, localhost is default
                            (needed for react only)
                        </td>
                    </tr>
                    <tr>
                        <td>REACT_APP_SERVER_PORT</td>
                        <td>
                            port number should be the same as SERVER_PORT (needed for react only)
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ol start={3}>
                    <li>Install npm packeges</li>
                </ol>
                <p>In the root folder(in terminal) run: npm install</p>
                <ol start={4}>
                    <li>Start server</li>
                </ol>
                <p>From the backend folder(in terminal) run: node server.js</p>
                <ol start={5}>
                    <li>Start frontend:</li>
                </ol>
                <p>From root folder(in terminal) run: npm start</p>
                <ol start={6}>
                    <li>
                        Open app in the browser,{" "}
                        <a href="http://localhost:3000">http://localhost:3000</a> is default
                        address
                    </li>
                </ol>
                <h2>API use</h2>
                <p>
                    On the start you have no tables created from which you may fetch your random
                    values. First thing you may want to do is to create some. It can be done
                    from your profile page. After you have some tables created you may fetch
                    them values by making GET request to the address{" "}
                    <a href="http://localhost:8080/mike/animals?token=sjvjjdvnjfnbjvj34838hvjbdfjv&count=12">
                        http://localhost:8080/mike/animals?token=sjvjjdvnjfnbjvj34838hvjbdfjv&amp;count=12
                    </a>{" "}
                    query parameters you need at least token={"{"}your_API_access_token{"}"}, as
                    option you may use count={"{"}elements_count_needed{"}"}. Example:
                    <a href="http://localhost:8080/mike/animals?token=sjvjjdvnjfnbjvj34838hvjbdfjv&count=12">
                        http://localhost:8080/mike/animals?token=sjvjjdvnjfnbjvj34838hvjbdfjv&amp;count=12
                    </a>
                    Please note, that in the application is a possibility to manage access to
                    your tables, it may be: public = everybody may access and use it by request
                    = table may be used only by table owner or by users to which table owner
                    gave access, but is visible in the hub private = same as by request, by it
                    is not visible in the hub
                </p>
                <p>
                    If the table has not public access type and you are not the owner(=table
                    creator), you may not use it before you get a permission.
                </p>
                <p>
                    It can be useful if you have multiple users of the API, so it is not a bug
                    it is feature.
                </p>
                <h2>Database structure</h2>
                <p>TODO: add DB image</p>
                <h2>API description</h2>
                <p>
                    Whole and detailed API description you may find in swagger.yml file, but
                    here is a short description of all paths:
                </p>
                <ol>
                    <li>Paths description:</li>
                </ol>
                <table>
                    <thead>
                    <tr>
                        <th>Action</th>
                        <th>Path</th>
                        <th>Method</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Create a new JWT for API access</td>
                        <td>jwt</td>
                        <td>POST</td>
                    </tr>
                    <tr>
                        <td>Get all user's JWTs for API access</td>
                        <td>jwt</td>
                        <td>GET</td>
                    </tr>
                    <tr>
                        <td>Delete a user's JWT for API access</td>
                        <td>jwt</td>
                        <td>DELETE</td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>Login to user profile</td>
                        <td>login</td>
                        <td>POST</td>
                    </tr>
                    <tr>
                        <td>Logout from user profile</td>
                        <td>login/logout</td>
                        <td>GET</td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>Register a new user</td>
                        <td>register</td>
                        <td>POST</td>
                    </tr>
                    <tr>
                        <td>Delete a user profile</td>
                        <td>register</td>
                        <td>DELETE</td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>Add access for user to a table*</td>
                        <td>userAllowed</td>
                        <td>POST</td>
                    </tr>
                    <tr>
                        <td>Get all tables to which user has an access</td>
                        <td>userAllowed</td>
                        <td>GET</td>
                    </tr>
                    <tr>
                        <td>Delete user access to the table**</td>
                        <td>userAllowed</td>
                        <td>DELETE</td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>Add a new user table</td>
                        <td>userDatabase</td>
                        <td>POST</td>
                    </tr>
                    <tr>
                        <td>Get all user tables data***</td>
                        <td>userDatabase</td>
                        <td>GET</td>
                    </tr>
                    <tr>
                        <td>Get concrete user table data***</td>
                        <td>
                            userDatabase/{"{"}tableName{"}"}?owner={"{"}ownerUsername{"}"}
                        </td>
                        <td>GET</td>
                    </tr>
                    <tr>
                        <td>Update user table data or its items</td>
                        <td>userDatabase</td>
                        <td>PUT</td>
                    </tr>
                    <tr>
                        <td>Delete user table*</td>
                        <td>userDatabase</td>
                        <td>DELETE</td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>Create table access request</td>
                        <td>accessRequest</td>
                        <td>POST</td>
                    </tr>
                    <tr>
                        <td>Get all table access requests</td>
                        <td>accessRequest</td>
                        <td>GET</td>
                    </tr>
                    <tr>
                        <td>Delete a table access request</td>
                        <td>accessRequest</td>
                        <td>DELETE</td>
                    </tr>
                    </tbody>
                </table>
                <p>*Can be done only by the table owner</p>
                <p>
                    **Can be done only by the table owner or by user from which access will be
                    deleted
                </p>
                <p>
                    ***Tables, which only can be shown to the user = with public or by request
                    access types
                </p>
                <ol start={2}>
                    <li>Request and response examples:</li>
                </ol>
                <table>
                    <thead>
                    <tr>
                        <th>Path</th>
                        <th>Method</th>
                        <th>Request object example(body)</th>
                        <th>Response object example(json())</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>jwt</td>
                        <td>POST</td>
                        <td>no need</td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been added" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>jwt</td>
                        <td>GET</td>
                        <td>no need</td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been found", "result": [{" "}
                            {"{"} "token": "{"{"}token number 1{"}"}" {"}"}, {"{"} "token": "{"{"}
                            token number 2{"}"}" {"}"}, {"{"} "token": "{"{"}token number 3{"}"}"{" "}
                            {"}"} ] {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>jwt</td>
                        <td>DELETE</td>
                        <td>
                            {"{"} "token": "{"{"}token to be deleted{"}"}"{"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been deleted" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>login</td>
                        <td>POST</td>
                        <td>
                            {"{"}"username": "mike", "password": "mike" {"}"}
                        </td>
                        <td>
                            {"{"} "hasAccess": true, "message": "Logged in successfully" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>login/logout</td>
                        <td>GET</td>
                        <td>No need</td>
                        <td>
                            {"{"} isSuccess: true, message: "Logged out successfully" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>register</td>
                        <td>POST</td>
                        <td>
                            {"{"}"username": "test", "password": "test" {"}"}
                        </td>
                        <td>
                            {"{"} "result": "Username was registered" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>register</td>
                        <td>DELETE</td>
                        <td>
                            {"{"}"username": "test", "password": "test" {"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "User has been deleted" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>userAllowed</td>
                        <td>POST</td>
                        <td>
                            {"{"}"name": "animals", "username": "test"{"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been added" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>userAllowed</td>
                        <td>GET</td>
                        <td>no need</td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been found", "result": [{" "}
                            {"{"} "username": "mike", "name": "animals" {"}"} ] {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>userAllowed</td>
                        <td>DELETE</td>
                        <td>
                            {"{"}"name": "animals", "username": "test"{"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been deleted" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>userDatabase</td>
                        <td>POST</td>
                        <td>
                            {"{"} "name": "cars", "description": "Description bla bla bla",
                            "accessType": "0", "elements": ["Volvo", "BMW", "VW"] {"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been added" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>userDatabase?own=true oruserDatabase</td>
                        <td>GET</td>
                        <td>no need</td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been found", "result": [{" "}
                            {"{"} "id": 8, "username": "mike", "name": "animals", "description":
                            "Here is some description of the table ", "accessType": 0 {"}"}, {"{"}{" "}
                            "id": 9, "username": "mike", "name": "cars", "description":
                            "Description bla bla bla", "accessType": 0 {"}"} ] {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>userDatabase/cars?owner=mike</td>
                        <td>GET</td>
                        <td>no need</td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been found", "result":{" "}
                            {"{"} "id": 9, "username": "mike", "name": "cars", "description":
                            "Description bla bla bla", "accessType": 0, "userCount": 1 {"}"} {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>userDatabase</td>
                        <td>PUT</td>
                        <td>
                            {"{"} "name": "cars", "description": "Changed description",
                            "accessType": "1" {"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been updated" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>userDatabase</td>
                        <td>DELETE</td>
                        <td>
                            {"{"} "name": "cars" {"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been deleted" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                        <td>.</td>
                    </tr>
                    <tr>
                        <td>accessRequest</td>
                        <td>POST</td>
                        <td>
                            {"{"}"receiver": "mike", "tableName": "myTable", "message": "Give me
                            access please"{"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been added" {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>accessRequest</td>
                        <td>GET</td>
                        <td>no need</td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been found", "result": [{" "}
                            {"{"} "id": 6, "sender": "test", "receiver": "mike", "tableName":
                            "animals", "message": "please let me access" {"}"}, {"{"} "id": 7,
                            "sender": "test", "receiver": "mike", "tableName": "cars", "message":
                            null {"}"} ] {"}"}
                        </td>
                    </tr>
                    <tr>
                        <td>accessRequest</td>
                        <td>DELETE</td>
                        <td>
                            {"{"} "id": 4 {"}"}
                        </td>
                        <td>
                            {"{"} "isSuccess": true, "message": "Data has been deleted" {"}"}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <h3>Access types explanation</h3>
                <p>0 - public, everybody can see and use the table</p>
                <p>
                    1 - by request, everybody can see, but can use only by table owner
                    promission
                </p>
                <p>2 - private, nobody can access and see the table</p>
            </>

        </div>
    );
}

export default AboutPage;
