'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

const server = new Hapi.Server();
server.connection({
    port: 3000,
    host: 'localhost'
});

const swagOptions = {
    info: {
            'title': 'Test API Documentation',
            'version': Pack.version,
    },
    'host': '104.236.93.224'
    };

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/slacktimote');

const RoomModel = require('./routes/rooms');
const BookingModel = require('./routes/bookings');

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
    {
        register: RoomModel,
        options: {},
    },
    {
        register: BookingModel,
        options: {},
    },
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

    if(err) {
        console.log(err);
    }
    server.start((err) => {
        if(err) {
            console.log(err);
        }
        server.log('Server running at: ', server.info.uri);
    });
});
