'use strict';

const Hapi = require('hapi');
const Good = require('good');

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

server.register({
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
}, (err) => {

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
