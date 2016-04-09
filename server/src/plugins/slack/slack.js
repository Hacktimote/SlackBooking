'use strict';

const unirest = require('unirest');
const RoomModel = require('../../models/rooms');

const SlackClient = require('slack-client');
const RtmClient = require('slack-client').RtmClient;

module.exports = (function() {

    const Slack = {};

    const postToSlack = function(options) {

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

        return rooms;
    }

    return Slack;

})();
