'use strict';

const unirest = require('unirest');
const RoomModel = require('../../models/rooms');

module.exports = (function() {

    const Slack = {};

    const postToSlack = function(rooms) {
        console.log(rooms);
		let roomValue= '';
		for(let room = 0; room < rooms.length; room++) {
			console.log(rooms[room]);
			roomValue += rooms[room].name + ' Location: ' + rooms[room].location + '\n';
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

    Slack.process = function(options) {

        var query = RoomModel.find({'status.name': 'Available'}).
            limit(5).
            select('name location');

            query.exec(function (error, data) {
                if (error) {
                    console.log(error);
                } else {
					postToSlack(data);
				}
            });
    }

    return Slack;

})();
