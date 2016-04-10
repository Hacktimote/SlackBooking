'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const unirest = require('unirest');
const _ = require('lodash');
const RoomModel = require('../../models/rooms');

exports.register = (plugin, options, next) => {

    plugin.route({
        method: 'POST',
        path: '/api/room',
        config: {
            tags: ['api'],
            description: 'Save room data',
            notes: 'Save room data',
            validate: {
                payload: {
                    name: Joi.string().required(),
                    beaconId: Joi.string().required(),
                    location: Joi.string().required(),
                    assets: Joi.array().items(Joi.string()),
                    capacity: Joi.string().required(),
                    status: Joi.object({
                        name: Joi.string().required(),
                        bookingId: Joi.string().allow('').optional(),
                        ownerId: Joi.string().allow('').optional()
                    })
                }
            }
        },
        handler: function (request, reply) {

            var room = new RoomModel(request.payload);

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
        path: '/api/room/{beaconId}',
        config: {
            tags: ['api'],
            description: 'Get room by UUID',
            notes: 'Get room by UUID',
            validate: {
                params: {
                    beaconId: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            RoomModel.find({beaconId: request.params.beaconId}, function (error, data) {
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
                params: {
                    id: Joi.string().required()
                },
                payload: {
                    status: Joi.object({
                        name: Joi.string().required(),
                        bookingId: Joi.string().allow('').optional(),
                        ownerId: Joi.string().allow('').optional()
                    })
                }
            }
        },
        handler: (request, reply) => {
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
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
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
