
'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const _ = require('lodash');
const BookingModel = require('../../models/bookings');
const RoomModel = require('../../models/rooms');

exports.register = (plugin, options, next) => {

    var Booking = require('./bookings');

    plugin.expose(Booking);

    plugin.route({
        method: 'POST',
        path: '/api/booking',
        config: {
            // "tags" enable swagger to document API
            tags: ['api'],
            description: 'Save booking data',
            notes: 'Save booking data',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    // Both name and age are required fields
                    roomId: Joi.string().required(),
                    start: Joi.date().required(),
                    end: Joi.date().required(),
                    invitees: Joi.array().items(Joi.string())
                }
            }
        },
        handler: function (request, reply) {
            console.log(request.payload);
            // Create mongodb user object to save it into database
            var booking = new BookingModel(request.payload);

            // Call save methods to save data into database
            // and pass callback methods to handle error
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
                        bookingId: response._id
                    };
                    const updated = {
                        status: status
                    }

                    console.log(updated);
                    console.log(response.roomId);
                    RoomModel.findOneAndUpdate({_id: response.roomId}, updated, function (error, data) {
                        if (error) {
                            reply({
                                statusCode: 503,
                                message: 'Failed to get data',
                            });
                        } else {
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
            //Fetch all data from mongodb User Collection
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
                // Id is required field
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            //Finding user for particular userID
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
