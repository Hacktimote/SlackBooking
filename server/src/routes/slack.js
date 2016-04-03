

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

    server.route({
        method: 'GET',
        path: '/api/booking/{id}',
        config: {
            tags: ['api'],
            description: 'Get booking by Id',
            notes: 'Get booking by Id',
            validate: {
                // Id is required field
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            //Finding user for particular userID
            RoomModel.find({_id: request.params.id}, function (error, data) {
                if (error) {
                    reply({
                        statusCode: 503,
                        message: 'Failed to get data',
                        data: error
                    });
                } else {
                    if (data.length === 0) {
                        reply({
                            statusCode: 200,
                            message: 'Room Not Found',
                            data: data
                        });
                    } else {
                        reply({
                            statusCode: 200,
                            message: 'Room Data Successfully Fetched',
                            data: data
                        });
                    }
                }
            });
        }
    })

    server.route({
        method: 'DELETE',
        path: '/api/booking/{id}',
        config: {
            tags: ['api'],
            description: 'Remove booking by id',
            notes: 'Remove booking by id',
            validate: {
                // Id is required field
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            //Finding user for particular userID
            RoomModel.findOneAndRemove({_id: request.params.id}, function (error, data) {
                if (error) {
                    reply({
                        statusCode: 503,
                        message: 'Failed to remove booking',
                        data: error
                    });
                } else {

                    reply({
                        statusCode: 200,
                        message: 'Room removed Successfully'
                    });
                }
            });
        }
    })

    next();
};

exports.register.attributes = {
    name: 'routes-bookings'
};
