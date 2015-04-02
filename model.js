var knex = require('knex')({
    client: 'postgres',
    // debug: true,
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'bulldog_chat',
        charset: 'utf8'
    }
});

// ------------------------------
// saveMessageIntoDB
// ------------------------------
// Saves a new message into the database.
// Creates a new user if the twitch user is not found.
function saveMessageIntoDB(username, message, emote) {
    new User({username: username}).fetch().then(function(fetchedUser) {
        if (fetchedUser) {
            // If user is found, go ahead and insert message.
            insertMessage(username, message, emote);
        } else {
            // If user not found, make a new one and insert message.
            new User({username: username}).save({}, {method: 'insert'}).then(function(fetchedUser) {
                insertMessage(username, message, emote);
            });
        }
    });
}

function getDongerSize(username, callback) {
    knex('message').select().count('msg').where('username', '=', username).then(function(result) {
        var count = result[0].count;
        var dongerSize = count / 10;
        callback(dongerSize);
    });
}

// ------------------------------
// insertMessage
// ------------------------------
// Inserts the message. Does not check if user 
// is in the database or not. Uses current UTC 
// time as the timestamp.
function insertMessage(username, message, emote) {
    var timestamp = String(new Date().getTime() / 1000);
    knex.raw('INSERT INTO message VALUES(DEFAULT, ?, ?, ?, to_timestamp(?))', [username, message, emote, timestamp]).then(function(newMessage) {});
}

var DB = require('bookshelf')(knex);

var User = DB.Model.extend({
    tableName: 'users',
    idAttribute: 'username'
});

var Message = DB.Model.extend({
    tableName: 'message',
    idAttribute: 'id'
});

module.exports = {
    getDongerSize: getDongerSize,
    saveMessageIntoDB: saveMessageIntoDB,
    User: User,
    Message: Message
}
