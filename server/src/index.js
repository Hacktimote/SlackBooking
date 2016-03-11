'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
        reply('Slack Booking');
    }
})

server.start((err) => {
    if(err) {
        console.log(err);
    }
    console.log('Server running at: ', server.info.uri);
})
