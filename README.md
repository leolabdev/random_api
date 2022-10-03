# Random API

## About project

In daily programming we often need some placeholder data. Such cases are for example HTML form to which we need to add examples for user or may be we need to find a name for a bot in a game. Whatever the case might be the Random API is a solution for all such headache.

Random API lets you add any kind of data to an API and use it later as you wish. For example you often need to use any random firstname-lastname pair. All you need to do is simply create a SQL table with firstnames, create a table with lastnames and use it via handy API requests. All of that can be via great UI.

Below you can see detailed instractions of how to get started and overall documentation of the project in case you wish to modify it. I hope you enjoy use of that piece of software.

## Getting started

1. Create a database

In the root folder you find DBScript.sql file open it and copy all of the content.
Open your SQL database in the terminal and paste the content of the file.
When it is done you have a database.

2. Configure .env file

In the root folder you find .env file
Open it and change values if needed:

| Field name            | Description                                                                                                             |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------|
| DATABASE_NAME         | name of your database, random_api is default                                                                            |
| DATABASE_USER         | username of your SQL database                                                                                           |
| DATABASE_PASSWORD     | password for the username                                                                                               |
| SERVER_HOST           | hostname, localhost is default                                                                                          |
| SERVER_PORT           | port number, where you wish to run API                                                                                  |
| JWT_SECRET            | encryption word for profile passwords, may be any word                                                                  |
| JWT_DATABASE_SECRET   | encryption word for API access keys, may be any word                                                                    |
| JWT_EXPIRES_IN        | time, after you will be logget out from your profile = cookie for access to your profile expires. Example 30d = 30 days |
| JWT_COOKIE_EXPIRES    | time, after your API access token expires. Example 30 = 30 days                                                         |
| CORS_ORIGIN           | base URL of your application = where your application (UI) is running, http://localhost:3000 is default                 |
| REACT_APP_SERVER_HOST | hostname should be the same as SERVER_HOST, localhost is default (needed for react only)                                |
| REACT_APP_SERVER_PORT | port number should be the same as SERVER_PORT (needed for react only)                                                   |

3. Install npm packeges

In the root folder(in terminal) run: npm install

4. Start server

From the backend folder(in terminal) run: node server.js

5. Start frontend:

From root folder(in terminal) run: npm start

6. Open app in the browser, http://localhost:3000 is default address

## API use

On the start you have no tables created from which you may fetch your random values. First thing you may want to do is to create some. It can be done from your profile page.
After you have some tables created you may fetch them values by making GET request to the address http://{SERVER_HOST}:{SERVER_PORT}/rand/{your_username}/{your_tablename}. As a query parameters you need at least token={your_API_access_token}, as option you may use count={elements_count_needed}. Example:
http://localhost:8080/mike/animals?token=sjvjjdvnjfnbjvj34838hvjbdfjv&count=12
Please note, that in the application is a possibility to manage access to your tables, it may be:
public = everybody may access and use it
by request = table may be used only by table owner or by users to which table owner gave access, but is visible in the hub
private = same as by request, by it is not visible in the hub

If the table has not public access type and you are not the owner(=table creator), you may not use it before you get a permission.

It can be useful if you have multiple users of the API, so it is not a bug it is feature.

## Database structure

TODO: add DB image

## API description

Whole and detailed API description you may find in swagger.yml file, but here is a short description of all paths:

1. Paths description:

| Action                                     | Path                                           | Method |
|--------------------------------------------|------------------------------------------------|--------|
| Create a new JWT for API access            | jwt                                            | POST   |
| Get all user's JWTs for API access         | jwt                                            | GET    |
| Delete a user's JWT for API access         | jwt                                            | DELETE |
| .                                          | .                                              | .      |
| Login to user profile                      | login                                          | POST   |
| Logout from user profile                   | login/logout                                   | GET    |
| .                                          | .                                              | .      |
| Register a new user                        | register                                       | POST   |
| Delete a user profile                      | register                                       | DELETE |
| .                                          | .                                              | .      |
| Add access for user to a table*            | userAllowed                                    | POST   |
| Get all tables to which user has an access | userAllowed                                    | GET    |
| Delete user access to the table**          | userAllowed                                    | DELETE |
| .                                          | .                                              | .      |
| Add a new user table                       | userDatabase                                   | POST   |
| Get all user tables data***                | userDatabase                                   | GET    |
| Get concrete user table data***            | userDatabase/{tableName}?owner={ownerUsername} | GET    |
| Update user table data or its items        | userDatabase                                   | PUT    |
| Delete user table*                         | userDatabase                                   | DELETE |
| .                                          | .                                              | .      |
| Create table access request                | accessRequest                                  | POST   |
| Get all table access requests              | accessRequest                                  | GET    |
| Delete a table access request              | accessRequest                                  | DELETE |


*Can be done only by the table owner

**Can be done only by the table owner or by user from which access will be deleted

***Tables, which only can be shown to the user = with public or by request access types

2. Request and response examples:

 | Path                                           | Method | Request object example(body)                                                                                                                      | Response object example(json())                                                                                                                                                                                                                                                                                                               | 
|------------------------------------------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | jwt                                            | POST   | no need                                                                                                                                           | {<br/> "isSuccess": true,<br/> "message": "Data has been added" <br/>}                                                                                                                                                                                                                                                                        |
 | jwt                                            | GET    | no need                                                                                                                                           | {<br/> "isSuccess": true,<br/> "message": "Data has been found",<br/> "result": [<br/> { "token": "{token number 1}" },<br/> { "token": "{token number 2}" },<br/> { "token": "{token number 3}" } <br/>] }                                                                                                                                   |
| jwt                                            | DELETE | {<br/> "token": "{token to be deleted}"<br/>}                                                                                                     | {<br/> "isSuccess": true,<br/> "message": "Data has been deleted" <br/>}                                                                                                                                                                                                                                                                      |
| .                                              | .      | .                                                                                                                                                 | .                                                                                                                                                                                                                                                                                                                                             |
 | login                                          | POST   | {<br/>"username": "mike",<br/> "password": "mike" <br/>}                                                                                          | {<br/> "hasAccess": true,<br/> "message": "Logged in successfully" <br/>}                                                                                                                                                                                                                                                                     |
 | login/logout                                   | GET    | No need                                                                                                                                           | {<br/> isSuccess: true,<br/> message: "Logged out successfully" <br/>}                                                                                                                                                                                                                                                                        |
 | .                                              | .      | .                                                                                                                                                 | .                                                                                                                                                                                                                                                                                                                                             |
 | register                                       | POST   | {<br/>"username": "test",<br/> "password": "test" <br/>}                                                                                          | {<br/> "result": "Username was registered" <br/>}                                                                                                                                                                                                                                                                                             |
 | register                                       | DELETE | {<br/>"username": "test",<br/> "password": "test" <br/>}                                                                                          | {<br/> "isSuccess": true,<br/> "message": "User has been deleted" <br/>}                                                                                                                                                                                                                                                                      |
 | .                                              | .      | .                                                                                                                                                 | .                                                                                                                                                                                                                                                                                                                                             |
 | userAllowed                                    | POST   | {<br/>"name": "animals",<br/> "username": "test"<br/>}                                                                                            | {<br/> "isSuccess": true,<br/> "message": "Data has been added" <br/>}                                                                                                                                                                                                                                                                        |
 | userAllowed                                    | GET    | no need                                                                                                                                           | {<br/> "isSuccess": true,<br/> "message": "Data has been found",<br/> "result": [<br/> {<br/> "username": "mike",<br/> "name": "animals" <br/>} ] }                                                                                                                                                                                           |
 | userAllowed                                    | DELETE | {<br/>"name": "animals",<br/> "username": "test"<br/>}                                                                                            | {<br/> "isSuccess": true,<br/> "message": "Data has been deleted" <br/>}                                                                                                                                                                                                                                                                      |
 | .                                              | .      | .                                                                                                                                                 | .                                                                                                                                                                                                                                                                                                                                             |
 | userDatabase                                   | POST   | {<br/> "name": "cars",<br/> "description": "Description bla bla bla",<br/> "accessType": "0",<br/> "elements": [<br/>"Volvo", "BMW", "VW"<br/>] } | {<br/> "isSuccess": true,<br/> "message": "Data has been added" <br/>}                                                                                                                                                                                                                                                                        |
 | userDatabase?own=true<br/> or<br/>userDatabase | GET    | no need                                                                                                                                           | {<br/> "isSuccess": true,<br/> "message": "Data has been found",<br/> "result": [<br/> { "id": 8, "username": "mike", "name": "animals", "description": "Here is some description of the table ", "accessType": 0 },<br/> { "id": 9, "username": "mike", "name": "cars", "description": "Description bla bla bla", "accessType": 0 } <br/>] } |
 | userDatabase/cars?owner=mike                   | GET    | no need                                                                                                                                           | {<br/> "isSuccess": true,<br/> "message": "Data has been found",<br/> "result": {<br/> "id": 9, "username": "mike", "name": "cars", "description": "Description bla bla bla", "accessType": 0, "userCount": 1 <br/>} }                                                                                                                        |
 | userDatabase                                   | PUT    | {<br/> "name": "cars",<br/> "description": "Changed description",<br/> "accessType": "1" <br/>}                                                   | {<br/> "isSuccess": true,<br/> "message": "Data has been updated" <br/>}                                                                                                                                                                                                                                                                      |
 | userDatabase                                   | DELETE | {<br/> "name": "cars" <br/>}                                                                                                                      | {<br/> "isSuccess": true,<br/> "message": "Data has been deleted" <br/>}                                                                                                                                                                                                                                                                      |
 | .                                              | .      | .                                                                                                                                                 | .                                                                                                                                                                                                                                                                                                                                             |
 | accessRequest                                  | POST   | {<br/>"receiver": "mike",<br/> "tableName": "myTable",<br/> "message": "Give me access please"<br/>}                                              | {<br/> "isSuccess": true,<br/> "message": "Data has been added" <br/>}                                                                                                                                                                                                                                                                        |
 | accessRequest                                  | GET    | no need                                                                                                                                           | {<br/> "isSuccess": true,<br/> "message": "Data has been found",<br/> "result": [<br/> { "id": 6, "sender": "test", "receiver": "mike", "tableName": "animals", "message": "please let me access" },<br/> { "id": 7, "sender": "test", "receiver": "mike", "tableName": "cars", "message": null }<br/> ] }                                    |
 | accessRequest                                  | DELETE | { <br/>"id": 4 <br/>}                                                                                                                             | {<br/> "isSuccess": true,<br/> "message": "Data has been deleted" <br/>}                                                                                                                                                                                                                                                                      |


 ### Access types explanation
 0 - public, everybody can see and use the table
  
 1 - by request, everybody can see, but can use only by table owner promission
 
 2 - private, nobody can access and see the table