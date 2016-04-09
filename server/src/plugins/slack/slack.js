'use strict';

const unirest = require('unirest');
const RoomModel = require('../../models/rooms');

module.exports = (function() {

    const Slack = {};

    const postToSlack = function(options) {
        unirest.post('https://hooks.slack.com/services/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')
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send({ "text": "Hello World"})
		.end(function (response) {
		  console.log(response.body);
		});
    }

    var getAvailableRooms = function() {

        RoomModel.find({'status.name': 'Available'}).
            limit(5).
            select('mame location').
            exec(function (error, data) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                    return data;
                }
            });
    }

    Slack.process = function(options) {

        var rooms = getAvailableRooms();

        console.log(rooms);
        postToSlack(rooms);
    }

    return Slack;

})();
