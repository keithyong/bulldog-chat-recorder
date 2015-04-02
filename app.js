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

    if (message === '!MyDongerSize') {
        Model.getDongerSize(user.username, function(dongerSize) {
            client.say(config.channels[0], user.username + '\'s donger size is ' + dongerSize + ' inches.');
        });
    }
});
