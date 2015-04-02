drop database if exists bulldog_chat;
create database bulldog_chat;

\connect bulldog_chat;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS message;

CREATE TABLE IF NOT EXISTS users (
    username        VARCHAR(100),
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS message (
    id              SERIAL,
    username        VARCHAR(100) NOT NULL,
    msg             TEXT NOT NULL,
    emote           JSON,
    timestamp       timestamptz NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (username) REFERENCES users(username)
);
