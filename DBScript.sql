CREATE DATABASE random_api;
USE random_api;

CREATE TABLE User(
    username VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE JWT(
    token VARCHAR(255) NOT NULL PRIMARY KEY,
    requestCount INT NOT NULL DEFAULT 0,
    username VARCHAR(30) NOT NULL,
    FOREIGN KEY (username) REFERENCES User(username)
);

CREATE TABLE UserDatabase(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(255) NOT NULL,
    accessType SMALLINT NOT NULL DEFAULT 0,
    FOREIGN KEY (username) REFERENCES User(username),
    UNIQUE (name)
);

CREATE TABLE UserAllowed(
    username VARCHAR(30) NOT NULL,
    id INT NOT NULL,
    PRIMARY KEY (username, id),
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (id) REFERENCES UserDatabase(id)
);

CREATE TABLE AccessRequest(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(30) NOT NULL,
    receiver VARCHAR(30) NOT NULL,
    message VARCHAR(255),
    FOREIGN KEY (sender) REFERENCES User(username),
    FOREIGN KEY (receiver) REFERENCES User(username)
);