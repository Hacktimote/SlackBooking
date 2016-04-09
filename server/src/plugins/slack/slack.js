'use strict';

const unirest = require('unirest');
const RoomModel = require('../../models/rooms');
const _ = require('lodash');
const moment = require('moment');

module.exports = (function() {

    const Slack = {};

    const postToSlack = function(rooms) {

		let roomValue= '';
		for(let room = 0; room < rooms.length; room++) {
			roomValue += '#' + rooms[room].location + ' | ' + rooms[room].name + '\n';
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
		});
    }

    const postErrorToSlack = function(error) {


		const message = {
			"text": "Command did not work \n" + error
		};


        unirest.post('https://hooks.slack.com/services/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')
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send(message)
		.end(function (response) {
		});
    }

    Slack.process = function(options) {

		if(options.text === '') {

			let query = RoomModel.find({'status.name': 'Available'}).
            limit(5).
            select('name location');

            query.exec(function (error, data) {
                if (error) {
					postErrorToSlack(error);
                } else {
					postToSlack(data);
				}
            });

		} else {
			let commandText = options.text;
			let commandArray = commandText.split(/(\s+)/);
			console.log(commandArray);
			if(commandArray.length >= 1) {

				const command = commandArray[0];
				const reservation = commandArray[2];

			} else {
				postErrorToSlack('command is too small');
			}

		}
    }

    return Slack;

})();
