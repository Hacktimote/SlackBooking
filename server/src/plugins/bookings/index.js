
'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const _ = require('lodash');
const BookingModel = require('../../models/bookings');
const RoomModel = require('../../models/rooms');
const Slack = require('../slack/slack.js');

exports.register = (plugin, options, next) => {

    var Booking = require('./bookings');

    plugin.expose(Booking);

    plugin.route({
        method: 'POST',
        path: '/api/booking',
        config: {
            tags: ['api'],
            description: 'Save booking data',
            notes: 'Save booking data',
            validate: {
                payload: {
                    roomId: Joi.string().required(),
                    start: Joi.date().required(),
                    end: Joi.date().required(),
					owner: Joi.date().required(),
                    invitees: Joi.array().items(Joi.string())
                }
            }
        },
        handler: function (request, reply) {

			let ownerId = request.payload.owner;
            var booking = new BookingModel(request.payload);
            booking.save(function (error, response) {
                if (error) {
                    reply({
                        statusCode: 503,
                        message: error
                    });
                } else {
                    console.log(response);

                    const status = {
                        name: 'Booked',
                        bookingId: response._id,
						ownerId: ownerId
                    };
                    const updated = {
                        status: status
                    }

                    RoomModel.findOneAndUpdate({_id: response.roomId}, updated, function (error, data) {
                        if (error) {
                            reply({
                                statusCode: 503,
                                message: 'Failed to get data',
                            });
                        } else {
                            Slack.postMessageToSlack('Room has been booked');
                            reply({
                                statusCode: 200,
                                message: 'Booking Saved'
                            });
                        }
                    });
                }
            });
        }
    });

    plugin.route({
        method: 'GET',
        config: {
            tags: ['api'],
            description: 'Get all Bookings',
            notes: 'Get all Bookings'
        },
        path: '/api/bookings',
        handler: (request, reply) => {
            BookingModel.find({}, function (error, data) {
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
        path: '/api/booking/{id}',
        config: {
            tags: ['api'],
            description: 'Get booking by Id',
            notes: 'Get booking by Id',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            BookingModel.find({_id: request.params.id}, function (error, data) {
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
        path: '/api/booking/{id}',
        config: {
            tags: ['api'],
            description: 'Remove booking by id',
            notes: 'Remove booking by id',
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
