var config = require('./config.js');
var irc    = require('twitch-irc');
var Model  = require('./model.js');

var client = new irc.client({
    identity: {
        username: config.twitchUsername,
        password: config.twitchPassword
    },
    channels: config.channels
});

client.connect();
console.log("Connected to channel " + config.channels + ".");

client.addListener('chat', function(channel, user, message) {
    Model.saveMessageIntoDB(user.username, message, user.emote);
});
