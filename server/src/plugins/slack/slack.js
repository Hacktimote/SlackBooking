'use strict';

const unirest = require('unirest');
const RoomModel = require('../../models/rooms');
const BookingModel = require('../../models/bookings');
const _ = require('lodash');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = (function() {

    const Slack = {};

    const postListToSlack = function(rooms) {

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

    Slack.postMessageToSlack = function(message) {

        unirest.post('https://hooks.slack.com/services/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')
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send({
			"text": message
		})
		.end(function (response) {
			return;
		});
    }

    Slack.postErrorToSlack = function(error) {


		const message = {
			"text": "Command did not work \n" + error
		};


        unirest.post('https://hooks.slack.com/services/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')
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send(message)
		.end(function (response) {
			return;
		});
    }

	const bookRoom = function(id) {

			var now = moment().format('YYYY-MM-DD');
			var hour = moment().add(1, 'h').format('YYYY-MM-DD');
			let ownerId = 'slack-timote';

			var payload = {
				"roomId": id,
				"start": now,
				"end": hour,
				"owner": ownerId,
				"invitees": [
					"string"
				]
			};

            var booking = new BookingModel(payload);

            booking.save(function (error, response) {

                if (error) {
                    reply({
                        statusCode: 503,
                        message: error
                    });
                } else {

                    let status = {
                        name: 'Booked',
                        bookingId: response._id,
						ownerId: ownerId
                    };
                    let updated = {
                        status: status
                    }
					console.log(response.roomId);
                    RoomModel.findOneAndUpdate({'_id': response.roomId._id}, updated, function (error, data) {
                        if (error) {
							console.log(error);
							Slack.postErrorToSlack('Failed to book room. Try again later');
                        } else {
							Slack.postMessageToSlack('Room Booked');
                        }
                    });
                }
            });
	};

	const getRoomId = function(reservation) {
		let query = RoomModel.find({'location': reservation}).
		select('_id');

		query.exec(function (error, data) {
			if (error) {
				Slack.postErrorToSlack(error);
			} else {
				bookRoom(data);
			}
		});
	}

    Slack.process = function(options) {

		if(options.text === '') {

			let query = RoomModel.find({'status.name': 'Available'}).
            select('name location');

            query.exec(function (error, data) {
                if (error) {
					Slack.postErrorToSlack(error);
                } else {
					postListToSlack(data);
				}
            });

		} else {
			let commandText = options.text;
			let commandArray = commandText.split(' ');

			if(commandArray.length == 2) {

				// const command = commandArray[0];
				let reservation = commandArray[1];
				reservation = reservation.replace("#", "");
				getRoomId(reservation);

			} else if (commandArray.length < 2) {
				console.log('Not enough parameters to book. You must include a room number');
			} else if (commandArray.length > 2) {
				console.log('You can only enter the command "/rooms book #{roomnumber}"');
			}

		}
    }

    return Slack;

})();
