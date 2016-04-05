'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const unirest = require('unirest');
const RoomModel = require('../models/rooms');
const _ = require('lodash');

exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/api/room',
        config: {
            // "tags" enable swagger to document API
            tags: ['api', 'rooms'],
            description: 'Save room data',
            notes: 'Save room data',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    // Both name and age are required fields
                    name: Joi.string().required(),
                    beacon_id: Joi.string().required(),
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

    server.route({
        method: 'GET',
        config: {
            tags: ['api', 'rooms'],
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

    server.route({
        method: 'GET',
        path: '/api/room/beacon/{beaconId}',
        config: {
            tags: ['api', 'rooms'],
            description: 'Get room by Beacon Id',
            notes: 'Get room by Beacon Id',
            validate: {
                // Id is required field
                params: {
                    beaconId: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            let room = {}, local, estimote;
            //Finding user for particular userID
            RoomModel.find({beacon_id: request.params.beaconId}, function (error, data) {
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
                        var req = unirest("GET", "https://cloud.estimote.com/v1/beacons/" + data[0].beacon_id);
                        req.headers({
                          "accept": "application/json",
                          "authorization": "Basic c2xhY2stdGltb3RlLWJvb2tpbmctMXYyOmQyNGRkNmI4NTEyYTRlMTZlZmU3NWJhYjE2NWI4MzE1"
                        });

                        req.end(function (res) {
                            if (res.error) {
                                console.log(res.error);
                            };
                            estimote = res.body;
                            room.local = data[0];
                            room.estimote = estimote;
                            console.log(room);
                            reply({
                                statusCode: 200,
                                message: 'Room Data Successfully Fetched',
                                data: room
                            });
                        });
                    }
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/room/{id}',
        config: {
            tags: ['api', 'rooms'],
            description: 'Get room by Id',
            notes: 'Get room by Id',
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
        method: 'PUT',
        path: '/api/room/{id}',
        config: {
            tags: ['api', 'rooms'],
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

    server.route({
        method: 'DELETE',
        path: '/api/room/{id}',
        config: {
            tags: ['api', 'rooms'],
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
