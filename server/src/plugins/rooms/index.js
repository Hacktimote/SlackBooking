'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const unirest = require('unirest');
const _ = require('lodash');
const RoomModel = require('../../models/rooms');

exports.register = (plugin, options, next) => {

    var Room = require('./rooms');

    plugin.expose(Room);

    plugin.route({
        method: 'POST',
        path: '/api/room',
        config: {
            // "tags" enable swagger to document API
            tags: ['api'],
            description: 'Save room data',
            notes: 'Save room data',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    // Both name and age are required fields
                    name: Joi.string().required(),
                    uuid: Joi.string().required(),
                    location: Joi.string().required(),
                    assets: Joi.array().items(Joi.string()),
                    capacity: Joi.string().required(),
                    status: Joi.object({
                        name: Joi.string().required(),
                        bookingId: Joi.string().allow('').optional()
                    })
                }
            }
        },
        handler: function (request, reply) {

            // Create mongodb user object to save it into database
            var room = new RoomModel(request.payload);

            // Call save methods to save data into database
            // and pass callback methods to handle error
            room.save(function (error) {
                if (error) {
                    reply({
                        statusCode: 503,
                        message: error
                    });
                } else {
                    reply({
                        statusCode: 201,
                        message: 'Room Saved Successfully'
                    });
                }
            });
        }
    });

    plugin.route({
        method: 'GET',
        config: {
            tags: ['api'],
            description: 'Get all Rooms',
            notes: 'Get all Rooms'
        },
        path: '/api/rooms',
        handler: (request, reply) => {
            //Fetch all data from mongodb User Collection
            RoomModel.find({}, function (error, data) {
                if (error) {
                    reply({
                        statusCode: 503,
                        message: 'Failed to get data',
                        data: error
                    });
                } else {
                    reply({
                        statusCode: 200,
                        message: 'Room Data Successfully Fetched',
                        data: data
                    });
                }
            });
        }
    })

    plugin.route({
        method: 'GET',
        path: '/api/room/{uid}',
        config: {
            tags: ['api'],
            description: 'Get room by UUID',
            notes: 'Get room by UUID',
            validate: {
                // Id is required field
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            //Finding user for particular userID
            RoomModel.find({uuid: request.params.uuid}, function (error, data) {
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

    plugin.route({
        method: 'PUT',
        path: '/api/room/{id}',
        config: {
            tags: ['api'],
            description: 'Update status for room',
            notes: 'Update status for room',
            validate: {
                // Id is required field
                params: {
                    id: Joi.string().required()
                },
                payload: {
                    // Both name and age are required fields
                    status: Joi.object({
                        name: Joi.string().required(),
                        bookingId: Joi.string().allow('').optional()
                    })
                }
            }
        },
        handler: (request, reply) => {
            //Finding user for particular userID
            RoomModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
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

    plugin.route({
        method: 'DELETE',
        path: '/api/room/{id}',
        config: {
            tags: ['api'],
            description: 'Remove room by id',
            notes: 'Remove room by id',
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
                        message: 'Failed to remove room',
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
    name: 'routes-rooms'
};
