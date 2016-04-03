
'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const unirest = require('unirest');
const RoomModel = require('../models/bookings');
const _ = require('lodash');

exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/api/booking',
        config: {
            // "tags" enable swagger to document API
            tags: ['bookings'],
            description: 'Save booking data',
            notes: 'Save booking data',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    // Both name and age are required fields
                    name: Joi.string().required(),
                    user_id: Joi.string().required(),
                    reserved: Joi.date().required(),
                }
            }
        },
        handler: function (request, reply) {

            // Create mongodb user object to save it into database
            var booking = new RoomModel(request.payload);

            // Call save methods to save data into database
            // and pass callback methods to handle error
            booking.save(function (error) {
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
            tags: ['bookings'],
            description: 'Get all Bookings',
            notes: 'Get all Bookings'
        },
        path: '/api/bookings',
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
        path: '/api/booking/beacon/{beaconId}',
        config: {
            tags: ['bookings'],
            description: 'Get booking by Beacon Id',
            notes: 'Get booking by Beacon Id',
            validate: {
                // Id is required field
                params: {
                    beaconId: Joi.string().required()
                }
            }
        },
        handler: (request, reply) => {
            let booking = {}, local, estimote;
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
                            booking.local = data[0];
                            booking.estimote = estimote;
                            console.log(booking);
                            reply({
                                statusCode: 200,
                                message: 'Room Data Successfully Fetched',
                                data: booking
                            });
                        });
                    }
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/booking/{id}',
        config: {
            tags: ['bookings'],
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
            tags: ['bookings'],
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
