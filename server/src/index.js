'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

const server = new Hapi.Server();

const PORT = 3000;
const HOST = '0.0.0.0';

server.connection({
    port: PORT,
    host: HOST
});

const swagOptions = {
    info: {
        'title': 'Slacktimote API Documentation',
        'version': Pack.version,
    },
    host: HOST,
    // 'host': 'hacktimote.site',
    tags: [{
            'name': 'rooms',
            'description': 'Room API calls'
        },
        {
            'name': 'bookings',
            'description': 'Booking API calls'
        },
        {
            'name': 'slack',
            'description': 'Slack API calls'
        }
    ]
};

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:4321/slacktimote');

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect('mongodb://localhost:27017/slacktimote', options);

const RoomModel = require('./plugins/rooms');
const BookingModel = require('./plugins/bookings');
const SlackRoutes = require('./plugins/slack');

server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
        reply('Slack Booking');
    }
})

server.register([
    Inert,
    Vision,
    {
        register: require('hapi-swagger'),
        options: swagOptions
    },
    { register: RoomModel },
    { register: BookingModel },
    { register: SlackRoutes },
    {
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }

            }]
        }
    }
], (err) => {

    if (err) {
        console.log(err);
    }
    server.start((err) => {
        if (err) {
            console.log(err);
        }
        server.log('Server running at: ', server.info.uri);
    });
});