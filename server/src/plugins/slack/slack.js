'use strict';

const unirest = require('unirest');
const RoomModel = require('../../models/rooms');

module.exports = (function() {

    const Slack = {};

    const postToSlack = function(rooms) {
        console.log(rooms);
		const roomValue = '';
		for(room in rooms) {
			roomValue += room.name + ' Location: ' + room.location + '\n';
		};

		console.log(roomValue);
		const message = {
			"text": "Here is a list of avaialable rooms.",
			"attachments": [
				{
					"fields": [
						{
							"title": "Rooms Available",
							"value": roomValue,
							"short": true
						}
					]
				}
			]
		};


        unirest.post('https://hooks.slack.com/services/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')
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send(message)
		.end(function (response) {
		  console.log(response.body);
		});
    }

    var getAvailableRooms = function() {

        RoomModel.find({'status.name': 'Available'}).
            limit(5).
            select('name location').
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

        postToSlack(rooms[0]);
    }

    return Slack;

})();
