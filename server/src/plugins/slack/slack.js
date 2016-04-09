'use strict';

const unirest = require('unirest');
const RoomModel = require('../../models/rooms');

const SlackClient = require('slack-client');

module.exports = (function() {

    const Slack = {};

    const postToSlack = function(options) {

        const slackClient = new SlackClient('xoxb-33342111186-90EAwXTIxKOx6F0zQR7PcJF4');
        slackClient.login();

        console.log(options);
        var channel = slackClient.getChannelGroupOrDMByID(options.channel);
        channel.send('Hello world!');

    }

    var getAvailableRooms = function() {

        RoomModel.find({'status.name': 'Available'}).
            limit(5).
            select('mame location').
            exec(function (error, data) {
                if (error) {
                    console.log(error);
                } else {
                    return data;
                }
            });
    }

    Slack.process = function(options) {

        var rooms = getAvailableRooms();

        postToSlack(options);
    }

    return Slack;

})();
