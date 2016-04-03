

'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const unirest = require('unirest');
const _ = require('lodash');

exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/api/slack',
        config: {
            // "tags" enable swagger to document API
            tags: ['api'],
            description: 'Save slack data',
            notes: 'Save slack data',
        },
        handler: function (request, reply) {

            if (request.payload.token === config.slash_token) {
                // Is the message format valid?
                var command = validate(request.payload.text);
                if (command.isValid) {
                    // Digest the message and take the reply fn as a callback
                    internals.processCommand(server, request, command, reply);
                } else {
                    reply(command.error);
                }
            } else {
                reply('Incorrect slash token')
            }
        }
    });

    server.route({
        method: 'GET',
        config: {
            tags: ['api'],
            description: 'Get all Bookings',
            notes: 'Get all Bookings'
        },
        path: '/api/slack',
        handler: (request, reply) => {
            if (request.payload.token === config.slash_token) {
                // Is the message format valid?
                var command = validate(request.payload.text);
                if (command.isValid) {
                    // Digest the message and take the reply fn as a callback
                    internals.processCommand(server, request, command, reply);
                } else {
                    reply(command.error);
                }
            } else {
                reply('Incorrect slash token')
            }
        }
    })

    next();
};

exports.register.attributes = {
    name: 'routes-slack'
};
