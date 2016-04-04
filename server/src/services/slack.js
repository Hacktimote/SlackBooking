'use strict';
const RoomModel = require('../models/rooms');

module.exports = (function() {

    var postToSlack = function(attachment, options) {

        var req = unirest("POST", "https://slack.com/api/chat.postMessage");
        req.headers({
          "accept": "application/json"
        });

        req.query = {
            "token": options.slack_token,
            "channel": options.channel_id,
            "username": 'SlackTimote',
            "attachments": JSON.stringify(attachment),
            "icon_url": SLACK_BOT_ICON,
        },

        req.end(function (res) {
            if (res.error) {
                console.log(res.error);
            };
            console.log(res);
        });

    }

    var getAvailableRooms = function() {

        RoomModel.find({'status.name': 'available'}).
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

    var process = function(options) {

        var rooms = getAvailableRooms();

        var attachment = [{
           'fallback': 'Required plain-text summary of the attachment',
           'author_name': 'Success! You created an item!',
           'title': 'Item: #1234',
           'title_link': 'Rooms available',
           'fields': rooms,
           'color': '#36a64f'
        }];

        postToSlack(attachment, options);
    }

    return {
        process: process
    }
})();
